import { Briefcase } from "lucide-react";
import AppliedJobsList from "./AppliedJobsList.jsx";

const ProfileActivitySection = ({
  appliedJobs,
  sortBy = "recent",
  onSortChange,
  filterBy = "all",
  onFilterChange,
}) => {
  const applications = appliedJobs || [];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-semibold text-slate-900 sm:text-xl">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
            Applied Jobs ({applications.length})
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage the roles you have applied to.
          </p>
        </div>
      </div>
      <AppliedJobsList
        applications={applications}
        sortBy={sortBy}
        onSortChange={onSortChange}
        filterBy={filterBy}
        onFilterChange={onFilterChange}
      />
    </section>
  );
};

export default ProfileActivitySection;
