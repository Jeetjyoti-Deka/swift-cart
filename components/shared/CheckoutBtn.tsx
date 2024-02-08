"use client";

import { SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn } from "@clerk/clerk-react";
import Checkout from "./Checkout";

const CheckoutBtn = () => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <>
      <SignedOut>
        <Button asChild variant="outline" className="w-full mt-4 mb-2">
          <Link href="/sign-in">Checkout</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Checkout userId={userId} />
      </SignedIn>
    </>
  );
};
export default CheckoutBtn;
