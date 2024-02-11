import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import CustomPagination from "./Pagination";

const Collection = ({
  products,
  page,
  totalPages,
  type,
}: {
  products: Product[];
  page: number;
  totalPages: number;
  type?: "order" | "wishlist" | "update" | "default";
}) => {
  if (products.length < 1) {
    return (
      <div className="w-full px-5">
        <div className="w-full bg-slate-200 text-center h-[300px] flex items-center justify-center rounded-[8px]">
          <h3 className="font-medium text-xl">No products found</h3>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 items-start place-items-center py-4 md:px-4 max-w-6xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} type={type} />
          ))}
        </div>
        {totalPages > 1 && (
          <CustomPagination page={page} totalPages={totalPages} type={type} />
        )}
      </>
    );
  }
};
export default Collection;
