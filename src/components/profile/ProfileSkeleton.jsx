import { Skeleton } from "../../../components/ui/skeleton.jsx";

const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 rounded-2xl border border-[#e6dccd] bg-white px-5 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-9 w-28" />
    </div>
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
