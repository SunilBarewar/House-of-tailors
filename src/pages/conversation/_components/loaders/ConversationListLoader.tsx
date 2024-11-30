import { Skeleton } from "@/components/ui/skeleton";

const ConversationListLoader = () => {
  return (
    <div className="flex h-full max-h-full w-[20%] flex-shrink-0 flex-col p-2 space-y-3 overflow-auto">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Skeleton className="h-16 w-full" key={index} />
        ))}
    </div>
  );
};

export default ConversationListLoader;
