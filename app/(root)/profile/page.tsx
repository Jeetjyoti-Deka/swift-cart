import Collection from "@/components/shared/Collection";
import { getOrderByBuyerId } from "@/lib/actions/order.action";
import {
  getUserIdByClerkId,
  getWishListProducts,
} from "@/lib/actions/user.actions";
import { OrderUi, Product, SearchParamProps } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const buyerId = await getUserIdByClerkId(userId); // this is the mongodb user id -> "_id"

  const orders = await getOrderByBuyerId({
    buyerId,
  });

  let orderProducts: Product[] = [];
  orders.forEach((order: OrderUi) => {
    order.products.forEach((product) =>
      orderProducts.push({
        _id: product.productId._id,
        name: product.productId.name,
        img: product.productId.img,
        price: product.productId.price,
        qty: product.qty,
      })
    );
  });

  const order_limit = 3;
  const order_totalPages = Math.ceil(orderProducts.length / order_limit);
  const order_page = Number(searchParams?.order_page) || 1;
  let start = (order_page - 1) * order_limit;
  let end = order_page * order_limit;
  orderProducts = orderProducts.slice(start, end);

  const wishlist_page = Number(searchParams?.wishlist_page) || 1;

  const wishListProducts = await getWishListProducts({
    userId: buyerId,
    page: wishlist_page,
    limit: 3,
  });

  return (
    <div>
      <h1 className="text-center my-4 text-2xl font-semibold">My Orders</h1>
      <Collection
        products={orderProducts}
        page={order_page}
        totalPages={order_totalPages}
        type="order"
      />
      <h1 className="text-center my-4 text-2xl font-semibold">My Wishlist</h1>
      <Collection
        products={wishListProducts?.data}
        page={wishlist_page}
        totalPages={wishListProducts?.totalPages!}
        type="wishlist"
      />
    </div>
  );
};
export default ProfilePage;
