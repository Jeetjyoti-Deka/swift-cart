import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import CustomPagination from "./Pagination";

const Collection = ({
  products,
  page,
  totalPages,
}: {
  products: Product[];
  page: number;
  totalPages: number;
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 items-start place-items-center py-4 md:px-4 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination page={page} totalPages={totalPages} />
      )}
    </>
  );
};
export default Collection;
