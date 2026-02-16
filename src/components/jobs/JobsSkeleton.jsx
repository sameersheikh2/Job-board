import Skeleton from "../../../components/ui/skeleton.jsx";

const JobsSkeleton = () => (
  <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={`job-skeleton-${index}`}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 5 }).map((__, metaIndex) => (
            <Skeleton
              key={`job-meta-${index}-${metaIndex}`}
              className="h-9 w-full rounded-lg"
            />
          ))}
        </div>

        <Skeleton className="mt-4 h-12 w-full rounded-lg" />

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 flex-1 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

export default JobsSkeleton;
