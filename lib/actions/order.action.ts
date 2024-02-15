"use server";

import Stripe from "stripe";
import { CheckoutOrderParams } from "../types";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongodb";
import Order, { TOrder } from "../mongodb/models/order.model";
import Product from "../mongodb/models/product.model";
import { reduceStockQty } from "./product.actions";

type getOrderByBuyerIdProps = {
  buyerId: string;
};

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let session;
  try {
    const lineItems = order.products.map((product) => {
      return {
        price_data: {
          currency: "usd",
          unit_amount: Number(product.price) * 100,
          product_data: {
            name: product.name,
          },
        },
        quantity: Number(product.qty),
      };
    });

    session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      metadata: {
        buyerId: order.buyerId,
        productIds: order.productIds.join(),
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
  } catch (error: any) {
    // TODO: Toast about the error message
    if (
      error.message &&
      error.message ===
        "Amount for an export transaction must be less than $10,000.00."
    ) {
      // toast
    } else {
      console.log(error);
    }
  }

  if (session?.url) {
    redirect(session?.url!);
  }
};

export const createOrder = async (order: TOrder) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create(order);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByBuyerId = async ({
  buyerId,
}: getOrderByBuyerIdProps) => {
  try {
    await connectToDatabase();

    const orders = await Order.find({ buyerId })
      .populate({
        path: "products.productId",
        model: Product,
        select: "name price img",
      })
      .select("-createdAt -stripeId");

    // console.log(orders[0].products);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
  }
};
