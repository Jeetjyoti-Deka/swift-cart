"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="p-4 sm:h-[64px] flex items-center justify-between max-sm:shadow-nav max-sm:rounded-[24px] max-sm:p-2 max-sm:mt-4 max-sm:mx-1">
      <div className="flex items-center justify-center gap-x-3">
        <MobileNav pathName={pathName} />
        <h4>SwiftCart</h4>
      </div>
      <SignedIn>
        <div className="hidden sm:flex items-center gap-x-4 text-lg">
          <Link
            href="/"
            className={`${
              pathName === "/" && "text-blue-400"
            } transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/profile"
            className={`${
              pathName === "/profile" && "text-blue-400"
            } transition-colors`}
          >
            Profile
          </Link>
        </div>
      </SignedIn>
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
