"use client";

import Image from "next/image";
import { Button } from "../ui/button";

const addToWishList = (productId: string) => {
  console.log("Product added to WishList");
};

const WishListBtn = ({ productId }: { productId: string }) => {
  return (
    <Button
      className="absolute top-0 right-0 bg-slate-50/40 hover:bg-slate-100/50 w-fit h-fit"
      onClick={() => addToWishList(productId)}
    >
      <Image src="/icons/wishlist.svg" alt="wishlist" width={15} height={18} />
    </Button>
  );
};
export default WishListBtn;
