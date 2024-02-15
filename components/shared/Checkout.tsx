"use client";

import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { checkoutOrder } from "@/lib/actions/order.action";
import { useStore } from "@/lib/store";
import { getSingleProduct } from "@/lib/actions/product.actions";
import { useToast } from "../ui/use-toast";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const { cart, totalPrice } = useStore();

  const onCheckout = async () => {
    let products = await Promise.all(
      cart.map(async (product) => {
        let Product = await getSingleProduct(product.productId);

        return {
          price: product.price,
          qty: product.qty,
          name: (Product?.name as string) || "",
          productId: product.productId,
        };
      })
    );

    const productIds = cart.map(
      (product) => product.productId + `-${product.qty}`
    );

    const order = {
      buyerId: userId,
      totalAmount: totalPrice,
      products: products,
      productIds,
    };

    const res = await checkoutOrder(order);

    if (res && res.message) {
      toast({
        title: "Payment Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form action={onCheckout} method="POST">
        <Button className="w-full mt-4 mb-2" variant="outline" type="submit">
          Checkout
        </Button>
      </form>
    </>
  );
};
export default Checkout;
