import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import { formatExperience } from "../../utils/experience.js";
import {
  formatDate,
  formatStatus,
  statusStyles,
} from "../../utils/jobFormatters.js";
import { useSelector } from "react-redux";

const JobCard = ({ job }) => {
  const statusKey = (job.status || "ACTIVE").toUpperCase();
  const { user, isLoggedIn } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();
  const jobId = job._id || job.id;
  const postedLabel = formatDate(job.createdAt || job.posted);
  const employmentLabel = job.employment
    ? formatStatus(job.employment.replace(/-/g, " "))
    : "";
  const experienceDisplay = formatExperience(job.experience);
  const handleApply = () => {
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
      className="rounded-2xl border border-[#e6dccd] bg-white p-5 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900">{job.title}</p>
          <p className="text-xs text-slate-500">
            {job.company}
            {job.team ? ` · ${job.team}` : ""}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[statusKey] || "bg-slate-100 text-slate-700"
          }`}
        >
          {formatStatus(statusKey)}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {job.locationType ? `${job.locationType} · ` : ""}
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          {postedLabel}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          {employmentLabel || "Role"}
        </span>
        <span className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          {experienceDisplay || "Experience"}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {job.openings ?? 0} openings
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Company: <span className="text-slate-700">{job.company}</span>
        </p>
        <div className="flex items-center gap-3">
          <Link
            to={`/jobs/${jobId}`}
            className="text-xs font-semibold text-[#0f172a] hover:underline"
          >
            View details
          </Link>
          <button
            onClick={handleApply}
            className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0c1323]"
          >
            Apply now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
