import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  Star,
  DollarSign,
} from "lucide-react";
import { formatExperience } from "../../utils/experience.js";
import {
  formatDate,
  formatStatus,
  statusStyles,
  formatSalary,
} from "../../utils/jobFormatters.js";
import { useSelector } from "react-redux";
import { showError } from "../../utils/toast.js";

const JobCard = ({ job }) => {
  const statusKey = (job.status || "ACTIVE").toUpperCase();
  const { user, isLoggedIn } = useSelector((state) => state.auth || {});
  const hasApplied = useSelector((state) => state.job.hasApplied);
  const applicationStatus = useSelector((state) => state.job.applicationStatus);
  const navigate = useNavigate();
  const jobId = job._id || job.id;
  const postedLabel = formatDate(job.createdAt || job.posted);
  const employmentLabel = job.employment
    ? formatStatus(job.employment.replace(/-/g, " "))
    : "";
  const experienceDisplay = formatExperience(job.experience);

  const handleApply = () => {
    if (hasApplied) {
      showError(`You have already applied to this job (${applicationStatus}).`);
      return;
    }
    if (user?.role === "recruiter") {
      navigate("/recruiter-dashboard");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: `/jobs/${jobId}` } });
      return;
    }

    navigate("/profile-edit", {
      state: {
        returnTo: `/jobs/${jobId}`,
        isApplyFlow: true,
        jobId: jobId,
      },
    });
  };

  return (
    <div
      key={jobId}
      id={jobId}
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col p-5 sm:p-6">
        {/* Header with title and status */}
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <Link to={`/jobs/${jobId}`} className="group/title">
              <p className="text-lg font-bold text-slate-900 transition-colors group-hover/title:text-slate-700 sm:text-xl">
                {job.title}
              </p>
            </Link>
            <p className="mt-1 text-sm text-slate-500">
              {job.company}
              {job.team ? ` • ${job.team}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                statusStyles[statusKey] || "bg-slate-100 text-slate-700"
              }`}
            >
              {formatStatus(statusKey)}
            </span>
          </div>
        </div>

        {/* Job metadata */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors group-hover:bg-slate-100 whitespace-nowrap text-xs">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
            <span className="text-slate-700 line-clamp-1">
              {job.locationType ? `${job.locationType}` : ""}
              {job.locationType && job.location ? " • " : ""}
              {job.location}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors group-hover:bg-slate-100 whitespace-nowrap text-xs">
            <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
            <span className="text-slate-700">{postedLabel}</span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors group-hover:bg-slate-100 whitespace-nowrap text-xs">
            <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
            <span className="text-slate-700">
              {employmentLabel || "Full-time"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors group-hover:bg-slate-100 whitespace-nowrap text-xs">
            <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
            <span className="text-slate-700 line-clamp-1">
              {experienceDisplay || "Any level"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors group-hover:bg-slate-100 whitespace-nowrap text-xs">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
            <span className="text-slate-700">
              {job.openings ?? 1} opening{job.openings !== 1 ? "s" : ""}
            </span>
          </div>

          {formatSalary(job.salaryAmount, job.salaryType) && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors group-hover:bg-slate-100 whitespace-nowrap text-xs">
              <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
              <span className="text-slate-700 font-medium">
                {formatSalary(job.salaryAmount, job.salaryType)}
              </span>
            </div>
          )}
        </div>

        {/* Description preview (if available) */}
        {job.description && (
          <p className="mt-4 line-clamp-2 text-sm text-slate-600">
            {job.description}
          </p>
        )}

        {/* Footer with actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
          <Link
            to={`/jobs/${jobId}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={handleApply}
            className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-slate-900 to-slate-800 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg active:scale-95"
          >
            Apply now
            <Star className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
