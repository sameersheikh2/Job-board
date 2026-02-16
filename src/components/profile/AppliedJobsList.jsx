import { SORT_OPTIONS_USER } from "../../utils/jobSortingUtils";
import {
  getUserApplicationStats,
  FILTER_STATUS_OPTIONS_USER,
} from "../../utils/jobFilteringUtils";
import { SortFilterControls } from "../recruiter/SortFilterControls";
import AppliedJobCard from "./AppliedJobCard.jsx";

const AppliedJobsList = ({
  applications = [],
  sortBy = "recent",
  onSortChange,
  filterBy = "all",
  onFilterChange,
}) => {
  const safeApplications = Array.isArray(applications) ? applications : [];
  const statusCounts = getUserApplicationStats(safeApplications);

  if (!safeApplications.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center sm:px-8">
        <p className="text-base font-medium text-slate-700 sm:text-lg">
          No applications yet
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Start applying to roles that match your skills and experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SortFilterControls
        sortBy={sortBy}
        onSortChange={onSortChange}
        filterBy={filterBy}
        onFilterChange={onFilterChange}
        sortOptions={SORT_OPTIONS_USER}
        filterOptions={FILTER_STATUS_OPTIONS_USER}
        statusCounts={statusCounts}
        title={`${safeApplications.length} application${safeApplications.length !== 1 ? "s" : ""}`}
      />

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {safeApplications.map((application) => (
          <AppliedJobCard key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsList;
