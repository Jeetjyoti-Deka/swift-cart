import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.action";
import { TOrder } from "@/lib/mongodb/models/order.model";
import { reduceStockQty } from "@/lib/actions/product.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const productsString = metadata?.productIds.split(",");

    const products = productsString?.map((product) => {
      return {
        productId: product.split("-")[0],
        qty: product.split("-")[1],
      };
    });

    const order: TOrder = {
      stripeId: id,
      products: products!,
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    console.log("before the reduce function");
    for (const product of order.products) {
      await reduceStockQty({ productId: product.productId, qty: product.qty });
    }

    const newOrder = await createOrder(order);

    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
