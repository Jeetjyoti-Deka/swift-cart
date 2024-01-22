import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const Collection = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 items-start place-items-center py-4 md:px-4 max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
export default Collection;
