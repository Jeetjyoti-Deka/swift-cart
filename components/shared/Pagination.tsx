"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  type?: "order" | "wishlist" | "default";
};

const CustomPagination = ({
  page,
  totalPages,
  type = "default",
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? page + 1 : page - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: type !== "default" ? `${type}_page` : "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mx-auto w-[180px] flex items-center justify-between my-2">
      <Button
        onClick={() => onClick("prev")}
        variant="outline"
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => onClick("next")}
        variant="outline"
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};
export default CustomPagination;
