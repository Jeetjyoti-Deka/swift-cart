"use client";

import { useStore } from "@/lib/store";
import CartItem from "./CartItem";

const CartItems = () => {
  const { cart } = useStore();
  return (
    <div className="flex flex-1 flex-col gap-y-2">
      {cart.map((item) => (
        <CartItem key={item.productId} cartItem={item} />
      ))}
    </div>
  );
};
export default CartItems;
