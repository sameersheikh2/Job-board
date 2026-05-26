import { Link } from "react-router-dom";
import { stats, featuredJobs } from "../../utils/constants.js";

const HeroSection = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 shadow-xs ">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            Fresh roles added weekly
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find your next <br />
              <span className="text-slate-500">developer role.</span>
            </h1>
            <p className="max-w-md text-lg text-slate-600 leading-relaxed">
              Discover curated opportunities from top startups and enterprises.
              Apply once, track everything, and move faster.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-98 cursor-pointer"
            >
              Browse jobs
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 active:scale-98 cursor-pointer"
            >
              I’m hiring
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center space-y-1">
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-xs sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-base font-bold text-white shadow-sm">
                  💼
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Featured Jobs
                  </div>
                  <div className="text-xs text-slate-500">
                    Signal-based matches for top builders
                  </div>
                </div>
              </div>
              <Link
                to="/jobs"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {featuredJobs.map(
                ({ id, title, company, logoColor, initials, pay, meta }) => (
                  <div
                    key={id}
                    className="group rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-xs cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${logoColor} text-xs font-bold font-mono tracking-wider shadow-xs`}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-slate-800">
                            {title}
                          </h4>
                          <span className="text-xs font-bold text-emerald-600 shrink-0">
                            {pay}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 font-medium">
                          <span>{company}</span>
                          <span>•</span>
                          <span>{meta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
