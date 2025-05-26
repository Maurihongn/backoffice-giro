import { Skeleton } from "../ui/skeleton";

export default function FormSkeleton() {
  return <>
  {/* header */}
    <div>
        <Skeleton className="h-8 w-1/4 mb-4" />
    </div>

    {/* form */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />

    </div>

    <div className="flex justify-end">
        <Skeleton className="h-10 w-36 mt-4" />

    </div>
  
  </>;
}
