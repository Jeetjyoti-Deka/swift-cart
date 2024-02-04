export type Product = {
  _id: string;
  name: string;
  img: string;
  stockQty: number;
  price: number;
  description: string;
  categories: {
    _id: string;
    name: string;
  }[];
};

export type CheckoutOrderParams = {
  buyerId: string;
  products: {
    price: number;
    qty: number;
    name: string;
    productId: string;
  }[];
  totalAmount: number;
  productIds: string[];
};
