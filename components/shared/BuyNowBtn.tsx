"use client";

import { useStore } from "@/lib/store";
import { Button } from "../ui/button";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";

type BuyNowBtnProps = {
  product: Product;
};

const BuyNowBtn = ({ product }: BuyNowBtnProps) => {
  const router = useRouter();
  const { buyItem } = useStore();
  return (
    <Button
      variant="outline"
      className="w-full mt-3"
      onClick={() => {
        buyItem({ productId: product._id, price: product.price, qty: 1 });
        router.push("/cart");
      }}
      disabled={product.stockQty! < 1}
    >
      Buy Now!
    </Button>
  );
};
export default BuyNowBtn;
