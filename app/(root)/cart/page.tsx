import CartItems from "@/components/shared/CartItems";
import CartSummary from "@/components/shared/CartSummary";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  return (
    <div className="relative">
      <Separator decorative className="sm:hidden block" />
      <div className="px-3 mt-6 lg:flex w-full">
        <CartItems />
        <CartSummary />
      </div>
    </div>
  );
};
export default CartPage;
