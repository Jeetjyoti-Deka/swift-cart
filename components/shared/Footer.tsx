"use client";

import FooterLinks from "./FooterLinks";
import { Separator } from "@radix-ui/react-separator";

const Footer = () => {
  return (
    <div className="w-full bg-slate-300 mt-10 py-6 px-2 flex flex-col items-center gap-y-2">
      <h3 className="font-medium text-xs sm:text-lg">
        This website is a Demo Project made by Jeetjyoti Deka.
      </h3>
      <Separator
        orientation="horizontal"
        className="h-[2px] my-2 bg-slate-700 w-[60%]"
      />
      <p>Contact Me:</p>
      <FooterLinks />
    </div>
  );
};
export default Footer;
