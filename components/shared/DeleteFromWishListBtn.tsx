"use client";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { deleteWishListItem } from "@/lib/actions/user.actions";
import DeleteIcon from "./DeleteIcon";

const removeFromList = async (productId: string, userId: string) => {
  await deleteWishListItem({ productId, userId });
};

const DeleteFromWishListBtn = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="absolute top-0 right-0 bg-slate-50/40 hover:bg-slate-100/50 w-fit h-fit"
            onClick={() => removeFromList(productId, userId)}
          >
            <DeleteIcon color="black" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Remove from Wishlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default DeleteFromWishListBtn;
