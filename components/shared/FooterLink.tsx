import Image from "next/image";
import Link from "next/link";

type FooterLinkProps = {
  img: string;
  href: string;
};

const FooterLink = ({ img, href }: FooterLinkProps) => {
  return (
    <div>
      <a
        href={href}
        target="_blank"
        className="group w-[50px] h-[50px] rounded-full bg-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center"
      >
        <Image
          src={img}
          width={25}
          height={25}
          alt="link"
          className="invert group-hover:invert-0"
        />
      </a>
    </div>
  );
};
export default FooterLink;
