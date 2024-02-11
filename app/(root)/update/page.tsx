import Collection from "@/components/shared/Collection";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/lib/types";

const UpdateProductsPage = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.update_page) || 1;
  const products = await getAllProducts({ page: page, limit: 6 });

  return (
    <div className="">
      <Collection
        products={products?.data}
        page={page}
        totalPages={products?.totalPages!}
        type="update"
      />
    </div>
  );
};
export default UpdateProductsPage;
