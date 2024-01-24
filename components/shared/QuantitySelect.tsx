"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";

type QuantitySelectProps = {
  stockQty: number;
};

const QuantitySelect = ({ stockQty }: QuantitySelectProps) => {
  const { setSelectQty } = useStore();
  return (
    // TODO: implement setting quantity in zustand
    <Select onValueChange={(e) => setSelectQty(Number(e))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Quantity" defaultValue={1} />
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
