"use client";

import { useStore } from "@/lib/store";
import { Button } from "../ui/button";

type AddToCartBtnProps = {
  productId: string;
  price: number;
};

const AddToCartBtn = ({ productId, price }: AddToCartBtnProps) => {
  const { addToCart, cart, selectQty } = useStore();
  return (
    <Button
      className="w-full sm:w-[60%] md:w-full lg:w-[50%] mt-6"
      variant="outline"
      onClick={() => {
        addToCart({
          productId,
          price,
          qty: selectQty,
        });
        console.log(cart);
      }}
    >
      Add To Cart!
    </Button>
  );
};
export default AddToCartBtn;
