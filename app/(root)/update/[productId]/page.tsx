import UpdateForm from "@/components/shared/UpdateForm";
import { getSingleProduct } from "@/lib/actions/product.actions";
import Image from "next/image";

const UpdatePage = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product = await getSingleProduct(productId);

  return (
    <div>
      <div className="mx-auto my-4 max-w-[600px] px-6 sm:px-0">
        <div className="flex items-center justify-center">
          <Image
            src={`/images/${product.img}`}
            width={200}
            height={200}
            alt={`${product.name}`}
            className="rounded-[8px]"
          />
        </div>
        <UpdateForm product={product} />
      </div>
    </div>
  );
};
export default UpdatePage;
