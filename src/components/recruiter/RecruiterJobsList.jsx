import {
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../../components/ui/dropdown-menu";
import { SORT_OPTIONS_RECRUITER } from "../../utils/jobSortingUtils";
import {
  getRecruiterJobStats,
  FILTER_STATUS_OPTIONS_RECRUITER,
} from "../../utils/jobFilteringUtils";
import { SortFilterControls } from "./SortFilterControls";
import AppliedFiltersBadges from "../jobs/AppliedFiltersBadges";
import { formatStatus, formatDate } from "../../utils/formatUtils";
import Pagination from "../jobs/Pagination";
import { formatSalary } from "../../utils/jobFormatters";

const statusStyles = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  DRAFT: "bg-amber-100 text-amber-700",
  CLOSED: "bg-slate-200 text-slate-700",
};

const RecruiterJobsList = ({
  jobs = [],
  isLoading = false,
  error,
  onEdit,
  onDelete,
  sortBy = "newest",
  onSortChange,
  filterBy = "all",
  onFilterChange,
  activeFilters = [],
  onRemoveFilter,
  onClearAllFilters,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalJobs = 0,
}) => {
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  const stats = getRecruiterJobStats(safeJobs);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading your roles...</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Applied Filters Badges */}
      {activeFilters.length > 0 && (
        <div className="mb-6">
          <AppliedFiltersBadges
            activeFilters={activeFilters}
            onRemoveFilter={onRemoveFilter}
            onClearAll={onClearAllFilters}
          />
        </div>
      )}

      <SortFilterControls
        sortBy={sortBy}
        onSortChange={onSortChange}
        filterBy={filterBy}
        onFilterChange={onFilterChange}
        sortOptions={SORT_OPTIONS_RECRUITER}
        filterOptions={FILTER_STATUS_OPTIONS_RECRUITER}
        statusCounts={stats}
        title="Your Jobs"
      />

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Jobs Card */}
        <div className="rounded-2xl border border-[#efe6d8] bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
            Total Jobs Posted
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalJobs}</p>
          <p className="mt-1 text-xs text-slate-600">
            {safeJobs.length} on this page
          </p>
        </div>

        {/* Active Jobs Card */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">
            Active Roles
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-900">
            {stats.active}
          </p>
          <p className="mt-1 text-xs text-emerald-700 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Actively hiring
          </p>
        </div>

        {/* Total Applicants Card */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold">
            Total Applicants
          </p>
          <p className="mt-3 text-3xl font-bold text-blue-900">
            {stats.totalApplicants}
          </p>
          <p className="mt-1 text-xs text-blue-700">Across all roles</p>
        </div>

        {/* Drafts Card */}
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold">
            Drafts
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-900">
            {stats.draft}
          </p>
          <p className="mt-1 text-xs text-amber-700">Ready to publish</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!safeJobs.length ? (
          <div className="col-span-full rounded-lg border border-slate-200 bg-white py-12 text-center">
            <p className="text-base font-medium text-slate-900">
              No roles found
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {activeFilters.length > 0
                ? "Try adjusting your filters"
                : "Start creating roles to see them here"}
            </p>
          </div>
        ) : (
          safeJobs.map((job) => {
            const statusKey = (job.status || "ACTIVE").toUpperCase();
            const statusLabel = formatStatus(statusKey);
            const jobId = job._id || job.id;
            const metaTeam = job.team ? ` · ${job.team}` : "";
            const employmentLabel = job.employment
              ? formatStatus(job.employment.replace(/-/g, " "))
              : job.type || "";
            const postedLabel = formatDate(job.createdAt || job.posted);
            const applicantLabel = job.applicantsCount ?? job.applicants ?? 0;
            const applicantText =
              applicantLabel === 1 ? "applicant" : "applicants";

            return (
              <div
                key={jobId}
                className="rounded-2xl border border-[#e6dccd] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {job.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {job.company}
                      {metaTeam}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[statusKey] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {statusLabel}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Job actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(job)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete?.(job)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-2" />
                          <Button className="p-2" variant="Destruction">
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.locationType ? `${job.locationType} · ` : ""}
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {postedLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {applicantLabel} {applicantText}
                  </span>
                  {formatSalary(job.salaryAmount, job.salaryType) && (
                    <span className="flex items-center gap-1 font-medium text-emerald-700">
                      <DollarSign className="h-4 w-4" />
                      {formatSalary(job.salaryAmount, job.salaryType)}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-slate-600">{employmentLabel}</span>
                  <button
                    type="button"
                    className="font-semibold text-[#0f172a] hover:underline"
                  >
                    View pipeline
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && !isLoading && safeJobs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default RecruiterJobsList;
