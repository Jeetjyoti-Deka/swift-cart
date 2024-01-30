import Collection from "@/components/shared/Collection";
import { getAllProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="">
      {/* TODO: Pass products from db */}
      <Collection products={products} />
    </div>
  );
}
