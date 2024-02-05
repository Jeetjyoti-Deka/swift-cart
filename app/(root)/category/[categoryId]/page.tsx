import Collection from "@/components/shared/Collection";
import { getCategoryName } from "@/lib/actions/category.actions";
import { getProductsByCategoryId } from "@/lib/actions/product.actions";
import { capitalizeString } from "@/lib/utils";

type CategoryPageParams = {
  params: { categoryId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const CategoryPage = async ({
  params: { categoryId },
  searchParams,
}: CategoryPageParams) => {
  const page = Number(searchParams?.page) || 1;

  const categoryName = await getCategoryName(categoryId);
  const products = await getProductsByCategoryId({
    categoryId,
    page: page,
    limit: 6,
  });

  return (
    <div>
      <h1 className="font-semibold text-2xl">
        {capitalizeString(categoryName)}
      </h1>
      <Collection
        products={products?.data}
        page={page}
        totalPages={products?.totalPages!}
      />
    </div>
  );
};
export default CategoryPage;
