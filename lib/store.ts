import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculatePrice } from "./utils";

export type CartProduct = {
  productId: string;
  price: number;
  qty: number;
};

type Store = {
  cart: CartProduct[];
  selectQty: number;
  totalPrice: number;
  addToCart: (cartProduct: CartProduct) => void;
  setSelectQty: (qty: number) => void;
  changeProductQuantity: (productId: string, qty: number) => void;
  deleteCartItem: (productId: string) => void;
  calculateTotalPrice: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      selectQty: 0,
      totalPrice: 0,
      addToCart: (cartProduct: CartProduct) => {
        set((state) => {
          const cartProductExist = state.cart.some(
            (product) => product.productId === cartProduct.productId
          );

          if (cartProductExist) {
            const newCartArr = state.cart.map((product) => {
              if (product.productId === cartProduct.productId) {
                return {
                  ...product,
                  qty: cartProduct.qty,
                };
              } else {
                return product;
              }
            });
            return { cart: newCartArr };
          } else {
            return { cart: [...state.cart, cartProduct] };
          }
        });
      },
      setSelectQty: (qty: number) => set(() => ({ selectQty: qty })),
      changeProductQuantity: (productId: string, qty: number) => {
        set((state) => {
          const products = state.cart.map((item) => {
            if (item.productId === productId) {
              return { ...item, qty };
            } else {
              return item;
            }
          });
          return { cart: products };
        });
      },
      deleteCartItem: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        }));
      },
      calculateTotalPrice: () =>
        set((state) => ({
          totalPrice: state.cart.reduce(
            (acc, curr) => acc + calculatePrice(curr.qty, curr.price),
            0
          ),
        })),
    }),
    { name: "cart" }
  )
);
