import AddToCartBtn from "@/components/shared/AddToCartBtn";
import Collection from "@/components/shared/Collection";
import ProductPageImage from "@/components/shared/ProductPageImage";
import QuantitySelect from "@/components/shared/QuantitySelect";
import {
  getRelatedProducts,
  getSingleProduct,
} from "@/lib/actions/product.actions";
import { Product } from "@/lib/types";
import Image from "next/image";

const ProductPage = async ({
  params: { productId },
  searchParams,
}: {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const product: Product = await getSingleProduct(productId);

  const page = Number(searchParams?.page) || 1;

  const relatedProducts = await getRelatedProducts({
    productId,
    page,
    limit: 3,
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-center gap-x-6">
        <ProductPageImage img={product.img} name={product.name} />
        <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-y-3 pt-3">
          <h1
            className={`text-2xl font-semibold ${
              product.stockQty! < 1 && "text-red-500"
            }`}
          >
            {product?.name} {product.stockQty! < 1 && `(Out Of Stock)`}
          </h1>
          <p className="font-medium text-slate-400 tracking-wide text-sm max-md:max-w-xl max-md:text-center">
            {product?.description}
          </p>
          <p className="text-lg">Price: ${product?.price}</p>
          <div className="flex items-center gap-x-3">
            Quantity:{" "}
            <div className="w-[180px]">
              <QuantitySelect stockQty={product?.stockQty!} defaultQty={1} />
            </div>
          </div>

          <AddToCartBtn
            productId={product?._id!}
            price={product?.price!}
            stockQty={product.stockQty!}
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-xl font-medium">Related Products</h3>
        <div className="bg-slate-100 rounded-[8px] py-2">
          <Collection
            products={relatedProducts?.data}
            page={page}
            totalPages={relatedProducts?.totalPages!}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
