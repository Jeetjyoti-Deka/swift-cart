"use client";

import { useStore } from "@/lib/store";

const CartPage = () => {
  const { cart } = useStore();
  return (
    <div>
      {cart.map((item) => (
        <p>{item.productId}</p>
      ))}
    </div>
  );
};
export default CartPage;
