import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Briefcase, MapPin, Users } from "lucide-react";
import { formatExperience } from "../../utils/experience.js";
import { formatStatus, statusStyles } from "../../utils/jobFormatters.js";

const JobDetailsContent = ({ jobDetails, applyCta }) => {
  const statusKey = (jobDetails.status || "ACTIVE").toUpperCase();
  const employmentLabel = jobDetails.employment
    ? formatStatus(jobDetails.employment.replace(/-/g, " "))
    : "";
  const experienceLabel = jobDetails.experience
    ? formatStatus(jobDetails.experience.replace(/-/g, " "))
    : "";
  const experienceDisplay = formatExperience(jobDetails.experience);
  const skills = jobDetails.skills
    ? jobDetails.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Job details
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {jobDetails.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {jobDetails.company}
              {jobDetails.team ? ` · ${jobDetails.team}` : ""}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 lg:hidden">
              <Link
                to={applyCta.to}
                className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0c1323]"
              >
                {applyCta.label}
              </Link>
              <Link
                to="/jobs"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Save for later
              </Link>
            </div>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              statusStyles[statusKey] || "bg-slate-100 text-slate-700"
            }`}
          >
            {formatStatus(statusKey)}
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-2xl border border-[#f0e7da] bg-[#faf7f2] px-3 py-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            {jobDetails.locationType
              ? `${jobDetails.locationType} · ${jobDetails.location}`
              : jobDetails.location}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#f0e7da] bg-[#faf7f2] px-3 py-2 text-sm text-slate-600">
            <Briefcase className="h-4 w-4" />
            {employmentLabel || "Role"}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#f0e7da] bg-[#faf7f2] px-3 py-2 text-sm text-slate-600">
            <BarChart3 className="h-4 w-4" />
            {experienceDisplay || experienceLabel || "Experience"}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#f0e7da] bg-[#faf7f2] px-3 py-2 text-sm text-slate-600">
            <Users className="h-4 w-4" />
            {jobDetails.openings ?? 0} openings
          </div>
        </div>

        <div className="mt-6 border-t border-[#f0e7da] pt-6">
          <h2 className="text-lg font-semibold text-slate-900">About the role</h2>
          <p className="mt-3 whitespace-pre-line text-sm text-slate-600">
            {jobDetails.description}
          </p>
        </div>

        {skills.length ? (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-900">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#e6dccd] bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {jobDetails.hiring ? (
          <div className="mt-6 border-t border-[#f0e7da] pt-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Hiring process
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {jobDetails.hiring}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JobDetailsContent;
