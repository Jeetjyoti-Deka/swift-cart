"use client";

import { useStore } from "@/lib/store";
import { useEffect } from "react";
import CartSummaryRow from "./CartSummaryRow";
import { Button } from "../ui/button";
import CheckoutBtn from "./CheckoutBtn";

const CartSummary = () => {
  const { totalPrice, calculateTotalPrice, cart } = useStore();
  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  if (cart.length > 0) {
    return (
      <div className="w-full sm:w-[40%] flex items-start justify-center mx-auto">
        <div className="border-2 w-full max-lg:my-4 sm:w-[600px] lg:w-[300px] py-2 px-4 border-slate-400 ">
          <h3 className="text-lg font-medium">Order Summary</h3>
          <CartSummaryRow text="Subtotal" price={totalPrice} />
          <CartSummaryRow text="Discount" price={0} />
          <CartSummaryRow text="Total" price={totalPrice} />

          <CheckoutBtn />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default CartSummary;
