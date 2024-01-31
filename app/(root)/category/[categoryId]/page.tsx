import Collection from "@/components/shared/Collection";
import { getCategoryName } from "@/lib/actions/category.actions";
import { getProductByCategoryId } from "@/lib/actions/product.actions";
import { capitalizeString } from "@/lib/utils";

type CategoryPageParams = {
  params: { categoryId: string };
};

const CategoryPage = async ({ params: { categoryId } }: CategoryPageParams) => {
  const categoryName = await getCategoryName(categoryId);
  const products = await getProductByCategoryId(categoryId);

  return (
    <div>
      <h1 className="font-semibold text-2xl">
        {capitalizeString(categoryName)}
      </h1>
      <Collection products={products} />
    </div>
  );
};
export default CategoryPage;
