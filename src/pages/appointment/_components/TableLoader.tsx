import { Skeleton } from "@/components/ui/skeleton";

const TableLoader = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div
            className="w-full flex h-12 justify-between items-center"
            key={index}
          >
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton className="h-full w-full" key={index} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default TableLoader;
