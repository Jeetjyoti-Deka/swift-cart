import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import WishListBtn from "./WishListBtn";

const ProductCard = () => {
  return (
    <Card className="w-[305px] overflow-hidden shadow-product-card relative">
      <CardHeader className="p-0">
        <Link href={"#"}>
          <Image
            src="/images/card-img-1.png"
            alt="img"
            width={357}
            height={357}
            className="w-full h-auto object-cover object-center"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-3 pt-2 flex flex-col gap-y-[9px]">
        <div className="mb-1 w-full flex items-center justify-start gap-x-2">
          <Badge className="bg-slate-300 text-slate-900 font-light cursor-pointer hover:text-slate-100">
            Electronic
          </Badge>
        </div>
        <Link href={"#"}>
          <h3 className="font-semibold text-2xl text-slate-900 line-clamp-1">
            Camera askdbvi ddd dddddd
          </h3>
        </Link>
        <p className="font-light text-slate-500 text-xl">Price: $100.00</p>
        <Button variant="outline" className="w-full mt-3">
          Buy Now!
        </Button>
        <WishListBtn productId="1" />
      </CardContent>
    </Card>
  );
};
export default ProductCard;
