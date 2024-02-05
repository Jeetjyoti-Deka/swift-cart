"use server";

import Stripe from "stripe";
import { CheckoutOrderParams } from "../types";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongodb";
import Order, { TOrder } from "../mongodb/models/order.model";

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
  } catch (error) {
    console.log(error);
  }
  redirect(session?.url!);
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
