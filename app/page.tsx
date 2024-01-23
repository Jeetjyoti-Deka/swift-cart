import Collection from "@/components/shared/Collection";
import { PRODUCTS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="">
      {/* TODO: Pass products from db */}
      <Collection products={PRODUCTS} />
    </div>
  );
}
