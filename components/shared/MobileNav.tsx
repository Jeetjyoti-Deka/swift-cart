import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import MobileNavLink from "./MobileNavLink";
import { NAV_LINKS } from "@/lib/constants";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";

const MobileNav = ({ pathName }: { pathName: string }) => {
  return (
    <div className="sm:hidden block">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
        </SheetTrigger>
        <SheetContent side="left" className=" px-6">
          <SheetHeader>
            <SheetTitle>SwiftCart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-between h-[90vh]">
            <div className="flex flex-col items-start gap-y-3 mt-10">
              {NAV_LINKS.map((link) => (
                <MobileNavLink
                  key={link.route}
                  label={link.label}
                  route={link.route}
                  pathName={pathName}
                />
              ))}
            </div>
            <SignedOut>
              <div>
                <SignInButton>
                  <SheetClose asChild>
                    <Button className="w-full mt-auto" variant="secondary">
                      Login
                    </Button>
                  </SheetClose>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNav;
