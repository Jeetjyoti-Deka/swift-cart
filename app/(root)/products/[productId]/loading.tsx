import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-center gap-x-6">
        <Skeleton className="w-[50%] h-[270px] md:h-[400px] shadow-product-card rounded-[8px] overflow-hidden mx-auto" />
        <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-y-3 pt-3">
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-[500px] h-3" />
          <Skeleton className="w-[230px] h-6 rounded-[4px] mt-10" />
        </div>
      </div>
    </div>
  );
};
export default loading;
