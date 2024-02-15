"use client";

import { useStore } from "@/lib/store";
import CartItem from "./CartItem";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const CartItems = () => {
  const { cart } = useStore();

  if (cart.length > 0) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col gap-y-2"
      >
        {cart.map((item) => (
          <CartItem key={item.productId} cartItem={item} />
        ))}
      </motion.div>
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
