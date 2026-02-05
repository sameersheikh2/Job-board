import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Skeleton from "../../../components/ui/skeleton.jsx";

const JobDetailsSkeleton = () => (
  <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <Link
      to="/jobs"
      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to jobs
    </Link>

    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={`detail-${index}`}
                className="h-10 w-full rounded-2xl"
              />
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-[#f0e7da] pt-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={`skill-${index}`}
                  className="h-6 w-16 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="mt-5 space-y-3">
            <Skeleton className="h-9 w-full rounded-full" />
            <Skeleton className="h-9 w-full rounded-full" />
          </div>
        </div>

        <div className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-24" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={`summary-${index}`} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </aside>
    </div>
  </section>
);

export default JobDetailsSkeleton;
