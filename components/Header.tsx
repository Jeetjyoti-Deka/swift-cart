"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { headerLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";

const Header = () => {
  const path = usePathname();
  return (
    <header className="wrapper w-full">
      <div className="flex justify-between items-center py-4 gap-4 mb-6 max-xl:px-4">
        <Link href="/">
          <Image src="/next.svg" width={100} height={100} alt="logo" />
        </Link>
        <div className="overflow-hidden flex-1 items-center justify-center hidden md:flex">
          {headerLinks.map((link) => {
            const isActive = path === link.route;
            return (
              <Link
                href={link.route}
                key={link.route}
                className={`header_link ${isActive && "text-secondary"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-none justify-center items-center gap-6">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <MobileNav />
        </div>
        <SignedOut>
          <Button
            asChild
            variant="default"
            className="btn-hover px-6 text-md md:flex hidden"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};
export default Header;
