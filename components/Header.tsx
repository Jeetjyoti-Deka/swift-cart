import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="wrapper w-full">
      <div className="flex justify-between items-center py-4 gap-4 mb-6 max-xl:px-4">
        <Link href="/" className="flex-1">
          <Image src="/next.svg" width={100} height={100} alt="logo" />
        </Link>
        <Link href="/" className="header_link">
          Home
        </Link>
        <Link href="/categories" className="header_link">
          Categories
        </Link>
        <Button
          variant="default"
          className="hover:bg-accent hover:text-primary px-6 text-md"
        >
          Login
        </Button>
      </div>
    </header>
  );
};
export default Header;
