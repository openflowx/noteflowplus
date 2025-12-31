import { Skeleton } from "../ui/skeleton";


export function FlowSkeleton() {
    return (
        <div className="p-5 bg-gray-100 rounded-3xl animate-pulse flex flex-col gap-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md mt-1" />
            <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
            </div>
        </div>
    );
}
