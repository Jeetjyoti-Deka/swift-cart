"use client";

import { useStore } from "@/lib/store";
import Image from "next/image";

const DeleteCartItem = ({ productId }: { productId: string }) => {
  const { deleteCartItem } = useStore();

  return (
    <div
      className="absolute top-8 sm:top-4 right-4 sm:right-4 cursor-pointer"
      onClick={() => deleteCartItem(productId)}
    >
      <Image src="/icons/delete.svg" alt="delete" width={24} height={24} />
    </div>
  );
};
export default DeleteCartItem;
