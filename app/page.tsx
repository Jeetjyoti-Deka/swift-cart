import Collection from "@/components/shared/Collection";
import { createCategory } from "@/lib/actions/category.actions";
import { createProduct, getAllProducts } from "@/lib/actions/product.actions";
import { PRODUCTS } from "@/lib/constants";

export default async function Home() {
  const products = await getAllProducts();
  // const category = await createCategory("Electric");
  // PRODUCTS.forEach(async (item) => {
  //   const product = await createProduct(item);
  // });

  return (
    <div className="">
      {/* TODO: Pass products from db */}
      <Collection products={products} />
    </div>
  );
}
