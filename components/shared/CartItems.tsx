"use client";

import { useStore } from "@/lib/store";
import CartItem from "./CartItem";
import Link from "next/link";
import { Suspense } from "react";

const CartItems = () => {
  const { cart } = useStore();

  if (cart.length > 0) {
    return (
      <div className="flex flex-1 flex-col gap-y-2">
        {cart.map((item) => (
          <Suspense key={item.productId} fallback={<h1>Loading...</h1>}>
            <CartItem cartItem={item} />
          </Suspense>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full h-[89vh] flex items-center justify-center">
        Cart is empty.{" "}
        <Link href="/" className="hover:underline text-lg font-medium">
          Continue Shopping...
        </Link>
      </div>
    );
  }
};
export default CartItems;
