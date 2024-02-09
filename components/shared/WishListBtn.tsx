"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { addToWishList } from "@/lib/actions/user.actions";

const addToList = async (productId: string, userId: string) => {
  await addToWishList({ productId, userId });
};

const WishListBtn = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="absolute top-0 right-0 bg-slate-50/40 hover:bg-slate-100/50 w-fit h-fit"
            onClick={() => addToList(productId, userId)}
          >
            <Image
              src="/icons/wishlist.svg"
              alt="wishlist"
              width={15}
              height={18}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to Wishlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default WishListBtn;
