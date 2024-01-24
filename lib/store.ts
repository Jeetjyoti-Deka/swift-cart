import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = {
  productId: string;
  price: number;
  qty: number;
};

type Store = {
  cart: CartProduct[];
  addToCart: (cartProduct: CartProduct) => void;
  selectQty: number;
  setSelectQty: (qty: number) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
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
      selectQty: 0,
      setSelectQty: (qty: number) => set(() => ({ selectQty: qty })),
    }),
    { name: "cart" }
  )
);
