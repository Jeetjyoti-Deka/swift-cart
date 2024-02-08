import Collection from "@/components/shared/Collection";
import { getOrderByBuyerId } from "@/lib/actions/order.action";
import { getUserIdByClerkId } from "@/lib/actions/user.actions";
import { OrderUi, Product, SearchParamProps } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const buyerId = await getUserIdByClerkId(userId);

  const orders = await getOrderByBuyerId({
    buyerId,
  });

  let products: Product[] = [];
  orders.forEach((order: OrderUi) => {
    order.products.forEach((product) =>
      products.push({
        _id: product.productId._id,
        name: product.productId.name,
        img: product.productId.img,
        price: product.productId.price,
        qty: product.qty,
      })
    );
  });

  const totalPages = Math.ceil(products.length / 6);
  const page = Number(searchParams?.page) || 1;
  let start = (page - 1) * 6;
  let end = page * 6;
  products = products.slice(start, end);

  return (
    <div>
      <h1 className="text-center my-4 text-2xl font-semibold">My Orders</h1>
      <Collection products={products} page={page} totalPages={totalPages} />
    </div>
  );
};
export default ProfilePage;
