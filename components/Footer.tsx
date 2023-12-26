import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-secondary py-4 px-4">
      <div className="wrapper flex flex-col gap-4 justify-between items-center sm:flex-row">
        <Link href="/">
          <Image src="/next.svg" alt="logo" width={100} height={20} />
        </Link>
        <p className="text-white whitespace-nowrap text-sm">
          &copy; 2023 All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
