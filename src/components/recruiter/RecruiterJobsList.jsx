import {
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../../components/ui/dropdown-menu";

const statusStyles = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  DRAFT: "bg-amber-100 text-amber-700",
  CLOSED: "bg-slate-200 text-slate-700",
};

const formatStatus = (status) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "";
const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const RecruiterJobsList = ({
  jobs = [],
  isLoading = false,
  error,
  onEdit,
  onDelete,
}) => {
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  const activeCount = safeJobs.filter(
    (job) => (job.status || "ACTIVE").toUpperCase() === "ACTIVE",
  ).length;
  const draftCount = safeJobs.filter(
    (job) => (job.status || "").toUpperCase() === "DRAFT",
  ).length;
  const applicantCount = safeJobs.reduce(
    (total, job) => total + (job.applicantsCount ?? job.applicants ?? 0),
    0,
  );

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading your roles...</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-500">{error}</p>;
  }

  if (!safeJobs.length) {
    return <p className="text-sm text-slate-500">No roles created yet.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-[#e6dccd] bg-white/90 p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Roles in flight
        </h2>
        <p className="text-sm text-slate-600">
          Monitor active roles, drafts, and responses in one place.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Active
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {activeCount}
            </p>
          </div>
          <div className="rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Drafts
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {draftCount}
            </p>
          </div>
          <div className="rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Applicants
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {applicantCount}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeJobs.map((job) => {
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
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
        })}
      </div>
    </div>
  );
};

export default RecruiterJobsList;
