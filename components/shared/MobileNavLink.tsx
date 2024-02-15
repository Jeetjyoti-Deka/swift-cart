import Image from "next/image";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";

type MobileNavLinkProps = {
  pathName: string;
  label: string;
  route: string;
  isAdmin: boolean;
};

const MobileNavLink = ({
  pathName,
  label,
  route,
  isAdmin,
}: MobileNavLinkProps) => {
  return (
    <SheetClose asChild>
      <Link
        href={route}
        className={`${pathName === route && "active-mobile-nav-link"} ${
          route === "/update" && isAdmin === false ? "hidden" : "" // hiding the update route
        } w-full flex items-center justify-start gap-x-2 rounded-[8px] px-4 py-2 `}
      >
        <Image
          src={`/icons/${label.toLowerCase()}.svg`}
          alt={`${label}`}
          width={24}
          height={24}
          className={`${pathName === route && "active-mobile-nav-icon"}`}
        />
        <p className="leading-4 text-lg font-medium">{label}</p>
      </Link>
    </SheetClose>
  );
};
export default MobileNavLink;
