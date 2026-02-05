import Skeleton from "../../../components/ui/skeleton.jsx";

const JobsSkeleton = () => (
  <div className="mt-8 grid gap-4 lg:grid-cols-2">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={`job-skeleton-${index}`}
        className="rounded-2xl border border-[#e6dccd] bg-white p-5 shadow-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((__, metaIndex) => (
            <Skeleton
              key={`job-meta-${index}-${metaIndex}`}
              className="h-4 w-28"
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default JobsSkeleton;
