"use client";

import { useStore } from "@/lib/store";
import { Button } from "../ui/button";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type AddToCartBtnProps = {
  productId: string;
  price: number;
  stockQty: number;
};

const AddToCartBtn = ({ productId, price, stockQty }: AddToCartBtnProps) => {
  const { addToCart, cart, selectQty } = useStore();
  const { toast } = useToast();
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
        toast({
          title: "Item added to Cart successfully.",
          description: "Visit Cart",
          action: (
            <ToastAction altText="Go to Cart" asChild>
              <Link href="/cart">Cart</Link>
            </ToastAction>
          ),
        });
      }}
      disabled={stockQty < 1}
    >
      Add To Cart!
    </Button>
  );
};
export default AddToCartBtn;
