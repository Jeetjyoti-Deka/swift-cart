import Collection from "@/components/shared/Collection";
import { createCategory } from "@/lib/actions/category.actions";
import { createProduct, getAllProducts } from "@/lib/actions/product.actions";
import { PRODUCTS } from "@/lib/constants";
import { SearchParamProps } from "@/lib/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const products = await getAllProducts({ page: page, limit: 6 });
  // const category = await createCategory("Electric");
  // PRODUCTS.forEach(async (item) => {
  //   const product = await createProduct(item);
  // });

  return (
    <div className="">
      <Collection
        products={products?.data}
        page={page}
        totalPages={products?.totalPages!}
      />
    </div>
  );
}
