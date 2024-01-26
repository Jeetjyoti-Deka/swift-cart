type CartSummaryProps = {
  text: string;
  price: number;
};

const CartSummaryRow = ({ text, price }: CartSummaryProps) => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-black/70">{text}</h4>
      <p>${price}</p>
    </div>
  );
};
export default CartSummaryRow;
