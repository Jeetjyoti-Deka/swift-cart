import Collection from "@/components/shared/Collection";
import ProductCard from "@/components/shared/ProductCard";
import { PRODUCTS } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* TODO: Pass products from db */}
      <Collection products={PRODUCTS} />
    </div>
  );
}
