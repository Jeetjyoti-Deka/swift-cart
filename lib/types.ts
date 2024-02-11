export type Product = {
  _id: string;
  name: string;
  img: string;
  stockQty?: number;
  qty?: string;
  price: number;
  description?: string;
  categories?: {
    _id: string;
    name: string;
  }[];
};

export type ProfileProductCardProps = {
  _id: string;
  name: string;
  img: string;
  price: number;
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

export type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type OrderUi = {
  _id: string;
  buyerId: string;
  products: {
    _id: string;
    productId: {
      name: string;
      _id: string;
      price: number;
      img: string;
    };
    qty: string;
  }[];
  totalAmount: string;
};

export type reduceStockQtyProps = {
  productId: string;
  qty: string | number;
};

export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
};

export type AddToWishListParams = {
  productId: string;
  userId: string;
};

export type DeleteWishListItemParams = {
  userId: string;
  productId: string;
};

export type UpdateProductParams = {
  values: Product;
};
