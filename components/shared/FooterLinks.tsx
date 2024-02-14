import { FOOTER_LINKS } from "@/lib/constants";
import FooterLink from "./FooterLink";

const FooterLinks = () => {
  return (
    <div className="flex items-center justify-center gap-x-4">
      {FOOTER_LINKS.map((link) => (
        <FooterLink key={link.href} img={link.img} href={link.href} />
      ))}
    </div>
  );
};
export default FooterLinks;
