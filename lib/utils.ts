import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
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

type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}
