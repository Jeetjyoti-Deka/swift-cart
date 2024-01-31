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
