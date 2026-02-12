import { Building2, Calendar, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  applied: "bg-blue-100 text-blue-700",
  reviewed: "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

const AppliedJobCard = ({ application }) => {
  if (!application || !application.job) return null;

  const navigate = useNavigate();
  const { job, status, appliedAt } = application;
  const appliedDate = new Date(appliedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md hover:border-slate-300 sm:p-5">
      {/* Header with Status */}
      <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
            {job?.title || "N/A"}
          </h3>
        </div>
        <span
          className={`whitespace-nowrap rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${
            statusStyles[status?.toLowerCase()] || "bg-slate-100 text-slate-700"
          }`}
        >
          {status || "applied"}
        </span>
      </div>

      {/* Company Info */}
      <div className="mb-4 space-y-2">
        <p className="flex items-center gap-2 text-sm text-slate-700">
          <Building2 className="h-4 w-4 flex-shrink-0 text-slate-500" />
          <span className="font-medium">{job?.company || "N/A"}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 flex-shrink-0 text-slate-500" />
          <span className="line-clamp-1">
            {job?.location || "Remote"} • {job?.locationType || "N/A"}
          </span>
        </p>
      </div>

      {/* Job Details */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        <div className="rounded-lg bg-slate-50 px-2 py-1.5 sm:px-3 sm:py-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-600">
            Employment
          </p>
          <p className="text-xs font-medium text-slate-900 sm:text-sm">
            {job?.employment || "N/A"}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 px-2 py-1.5 sm:px-3 sm:py-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-600">
            Experience
          </p>
          <p className="text-xs font-medium text-slate-900 sm:text-sm">
            {job?.experience || "N/A"}
          </p>
        </div>
        {job?.salary && (
          <div className="rounded-lg bg-slate-50 px-2 py-1.5 sm:px-3 sm:py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-600">
              Salary
            </p>
            <p className="text-xs font-medium text-slate-900 sm:text-sm">
              {job.salary}
            </p>
          </div>
        )}
      </div>

      {/* Skills */}
      {job?.skills && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Required Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.skills
              .split(",")
              .slice(0, 4)
              .map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                >
                  {skill.trim()}
                </span>
              ))}
            {job.skills.split(",").length > 4 && (
              <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                +{job.skills.split(",").length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer with Applied Date and Action */}
      <div className="flex flex-col items-start justify-between gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Applied {appliedDate}</span>
        </p>
        <button
          onClick={() =>
            navigate(`/jobs/${job._id}`, {
              state: { fromApplied: true, status },
            })
          }
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AppliedJobCard;
