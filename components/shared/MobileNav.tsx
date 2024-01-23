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

const MobileNav = ({ pathName }: { pathName: string }) => {
  return (
    <div className="sm:hidden block">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="space-y-10">
            <SheetTitle>SwiftCart</SheetTitle>
            <div className="flex flex-col items-start gap-y-3 px-4">
              {NAV_LINKS.map((link) => (
                <MobileNavLink
                  key={link.route}
                  label={link.label}
                  route={link.route}
                  pathName={pathName}
                />
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNav;
