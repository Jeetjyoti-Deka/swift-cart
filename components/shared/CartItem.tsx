import { CartProduct } from "@/lib/store";
import Image from "next/image";
import QuantitySelect from "./QuantitySelect";
import { calculatePrice } from "@/lib/utils";
import Link from "next/link";
import DeleteCartItem from "./DeleteCartItem";
import { getSingleProduct } from "@/lib/actions/product.actions";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";

const CartItem = ({ cartItem }: { cartItem: CartProduct }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const item = await getSingleProduct(cartItem.productId);
        setProduct(item);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [cartItem]);

  if (product) {
    return (
      <div className="flex items-start justify-start gap-x-2 hover:bg-slate-100 transition-colors overflow-hidden relative">
        <div className="flex sm:block max-sm:flex-col">
          <Image
            src={`/images/${product.img!}`}
            alt={product?.name || "product"}
            width={200}
            height={200}
            className="rounded-[8px] w-[100px] sm:w-[200px] h-auto object-cover"
          />
          <div className="block sm:hidden w-[100px] max-sm:p-2">
            <QuantitySelect
              stockQty={product.stockQty!}
              defaultQty={cartItem.qty}
              itemExistInCart={true}
              productId={product._id}
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-between py-1">
          <Link href={`/products/${cartItem.productId}`}>
            <h3 className="font-medium text-lg sm:text-xl hover:underline max-sm:line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="max-sm:text-sm">Price: ${product.price}</p>
          <div className="sm:flex items-center justify-between w-full pr-4 hidden ">
            <div className="w-[180px]">
              <QuantitySelect
                stockQty={product.stockQty!}
                defaultQty={cartItem.qty}
                itemExistInCart={true}
                productId={product._id}
              />
            </div>
            <p>Total: ${calculatePrice(cartItem.qty, product.price)}</p>
          </div>
        </div>
        <DeleteCartItem productId={product._id} />
      </div>
    );
  } else {
    return <></>;
  }
};
export default CartItem;
