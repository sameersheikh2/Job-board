import { Link } from "react-router-dom";
import {
  BarChart3,
  Banknote,
  Briefcase,
  CalendarDays,
  Clock,
  Users,
} from "lucide-react";
import { formatExperience } from "../../utils/experience.js";
import { formatDate, formatStatus } from "../../utils/jobFormatters.js";

const JobDetailsSidebar = ({
  jobDetails,
  applyCta,
  onApply,
  isDisabled,
  isRecruiter,
}) => {
  const employmentLabel = jobDetails.employment
    ? formatStatus(jobDetails.employment.replace(/-/g, " "))
    : "";
  const experienceLabel = jobDetails.experience
    ? formatStatus(jobDetails.experience.replace(/-/g, " "))
    : "";
  const experienceDisplay = formatExperience(jobDetails.experience);

  return (
    <aside className="space-y-4">
      <div className="hidden rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Apply
        </p>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          Interested in this role?
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Make sure your profile is up to date before applying.
        </p>
        <div className="mt-5 space-y-3">
          {isDisabled ? (
            <button
              disabled
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 cursor-not-allowed"
            >
              {applyCta.label}
            </button>
          ) : onApply ? (
            <button
              onClick={onApply}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0c1323]"
            >
              {applyCta.label}
            </button>
          ) : (
            <Link
              to={applyCta.to}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0c1323]"
            >
              {applyCta.label}
            </Link>
          )}
          {!isRecruiter && (
            <Link
              to="/jobs"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#cbb89f] px-4 py-2 text-sm font-semibold text-[#0f172a] transition hover:bg-[#f2e8d8]"
            >
              Save for later
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Job summary</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Posted {formatDate(jobDetails.createdAt)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Deadline {formatDate(jobDetails.deadline)}
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {experienceDisplay || experienceLabel || "Experience"}
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {employmentLabel || "Employment"}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {jobDetails.openings ?? 0} openings
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            {jobDetails.salary || "Salary not disclosed"}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default JobDetailsSidebar;
