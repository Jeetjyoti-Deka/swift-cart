import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePrice(qty: number, price: number) {
  const result = (qty * price).toFixed(2);
  return parseFloat(result);
}

export function capitalizeString(input: string): string {
  if (!input || typeof input !== "string") {
    throw new Error("Invalid input. Please provide a valid string.");
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}
