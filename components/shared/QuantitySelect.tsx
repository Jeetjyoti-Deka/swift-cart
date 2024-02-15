"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

type QuantitySelectProps = {
  stockQty: number;
  defaultQty?: number;
  itemExistInCart?: boolean;
  productId?: string;
};

const QuantitySelect = ({
  stockQty,
  defaultQty,
  itemExistInCart,
  productId,
}: QuantitySelectProps) => {
  const { setSelectQty, changeProductQuantity } = useStore();
  useEffect(() => {
    setSelectQty(defaultQty || 1);
  }, []);

  const handleValueChange = (e: string) => {
    if (itemExistInCart && productId) {
      changeProductQuantity(productId, Number(e));
    } else {
      setSelectQty(Number(e));
    }
  };

  return (
    // TODO: implement setting quantity in zustand
    <Select onValueChange={(e) => handleValueChange(e)}>
      <SelectTrigger className="w-full" disabled={stockQty < 1}>
        <SelectValue
          placeholder={defaultQty || "Select Quantity"}
          defaultValue={defaultQty || 1}
        />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: stockQty }, () => 0).map((_, index) => (
          <SelectItem key={index + 1} value={(index + 1).toString()}>
            {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default QuantitySelect;
