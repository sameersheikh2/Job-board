import { Calendar, MapPin, Users } from "lucide-react";

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

const RecruiterJobsList = ({ jobs = [], isLoading = false, error }) => {
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
    <div className="space-y-4">
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

      <div className="grid gap-4">
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

          return (
            <div
              key={jobId}
              className="rounded-2xl border border-[#e6dccd] bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {job.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {job.company}
                    {metaTeam}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[statusKey] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
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
                  {applicantLabel} applicants
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{employmentLabel}</span>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#0f172a] hover:underline"
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
