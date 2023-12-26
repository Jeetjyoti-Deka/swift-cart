"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { headerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";

const MobileNav = () => {
  const path = usePathname();
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Image src="/next.svg" alt="logo" width={100} height={20} />
          <Separator className="bg-slate-300" />
          {headerLinks.map((link) => {
            const isActive = path === link.route;
            return (
              <Link
                href={link.route}
                key={link.route}
                className={`header_link ${isActive && "text-white bg-primary"}`}
              >
                {link.label}
              </Link>
            );
          })}

          <SignedOut>
            <Separator className="bg-slate-300" />
            <Button
              asChild
              variant="default"
              className="hover:bg-accent hover:text-primary px-6 text-md flex bg-secondary transition-all"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNav;
