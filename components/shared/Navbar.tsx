"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import { checkAdminWithUserId } from "@/lib/actions/user.actions";

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const setAdminStatus = async () => {
      if (userId) {
        const result = await checkAdminWithUserId(userId);
        setIsAdmin(result);
      }
    };

    setAdminStatus();
  }, [userId]);

  return (
    <nav className="p-4 sm:h-[64px] flex items-center justify-between max-sm:shadow-nav max-sm:rounded-[24px] max-sm:p-2 max-sm:mt-4 max-sm:mx-1">
      <div className="flex items-center justify-center gap-x-3">
        <MobileNav pathName={pathName} isAdmin={isAdmin} />
        <h4>SwiftCart</h4>
      </div>
      <div className="hidden sm:flex items-center gap-x-4 text-lg">
        <Link
          href="/"
          className={`${pathName === "/" && "text-blue-400"} transition-colors`}
        >
          Home
        </Link>
        <Link
          href="/cart"
          className={`${
            pathName === "/cart" && "text-blue-400"
          } transition-colors`}
        >
          Cart
        </Link>
        <SignedIn>
          <Link
            href="/profile"
            className={`${
              pathName === "/profile" && "text-blue-400"
            } transition-colors`}
          >
            Profile
          </Link>
          {isAdmin && <Link href="/update">Update products</Link>}
        </SignedIn>
      </div>
      <div className="">
        <SignedOut>
          <div className="hidden sm:block">
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};
export default Navbar;
