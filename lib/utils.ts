import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePrice(qty: number, price: number) {
  const result = (qty * price).toFixed(2);
  return parseFloat(result);
}
