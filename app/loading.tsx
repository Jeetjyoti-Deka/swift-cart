import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const loading = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 items-start place-items-center py-4 md:px-4 max-w-6xl mx-auto">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card
          key={item}
          className="w-[280px] md:w-[305px] overflow-hidden shadow-product-card relative group"
        >
          <CardHeader className="p-0 overflow-hidden">
            <Skeleton className="w-[357px] h-[200px] bg-slate-200" />
          </CardHeader>
          <CardContent className="p-3 pt-2 flex flex-col gap-y-[9px] mt-2">
            <Skeleton className="w-20 h-4 rounded-[8px]" />
            <Skeleton className="w-full h-4 rounded-[8px]" />
            <Skeleton className="w-32 h-4 rounded-[8px]" />
            <Skeleton className="w-full h-10 my-4 rounded-[8px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default loading;
