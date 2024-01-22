import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import WishListBtn from "./WishListBtn";
import { Product } from "@/lib/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-[280px] md:w-[305px] overflow-hidden shadow-product-card relative group">
      <CardHeader className="p-0">
        <Link href={`/products/${product._id}`}>
          <div className="overflow-hidden">
            <Image
              src={`/images/${product.img}`}
              alt="img"
              width={357}
              height={357}
              className="w-full h-[200px] object-cover object-center group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-3 pt-2 flex flex-col gap-y-[9px]">
        <div className="mb-1 w-full flex items-center justify-start gap-x-2">
          <Badge className="bg-slate-300 text-slate-900 font-light cursor-pointer hover:text-slate-100">
            Electronic
          </Badge>
        </div>
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-2xl text-slate-900 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-light text-slate-500 text-xl">
          Price: ${product.price}
        </p>
        <Button variant="outline" className="w-full mt-3">
          Buy Now!
        </Button>
        <WishListBtn productId={product._id} />
      </CardContent>
    </Card>
  );
};
export default ProductCard;
