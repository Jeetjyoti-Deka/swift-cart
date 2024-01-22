import ProductCard from "@/components/shared/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-[90vh]">
      <ProductCard />
    </div>
  );
}
