import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-4 xl:px-0">
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 bg-slate-50 py-10 px-4 md:py-20 rounded-md">
        <section className="flex flex-col items-center justify-center md:items-start md:gap-3">
          <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-6 text-center md:text-left mb-3">
            Elevate Your Style, Simplify Your Shopping with{" "}
            <span className="text-accent">SwiftCart</span>.
          </h1>
          <p className="text-sm text-center md:text-left tracking-[2px] leading-[23px] mb-6 max-w-md">
            Shop Trendsetting Styles, Exclusive Deals, and Effortless Checkout –
            All in One App!
          </p>
          <Button className="w-full md:w-[200px] btn-hover text-lg">
            Explore Now!
          </Button>
        </section>
        <div className="flex items-center justify-center">
          <Image
            src="/sunset.svg"
            alt="sunset"
            width={300}
            height={300}
            className="md:h-96 md:object-contain md:w-auto"
          />
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="mt-10">
        <h2 className="text-lg text-center md:text-left sm:text-xl md:text-3xl font-medium mb-6">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>Product</div>
          <div>Product</div>
          <div>Product</div>
          <div>Product</div>
          <div>Product</div>
          <div>Product</div>
          <div>Product</div>
        </div>
      </div>
    </main>
  );
}
