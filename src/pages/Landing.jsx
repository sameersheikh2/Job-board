import { Link } from "react-router-dom";
import TalentShowcase from "../components/TalentShowcase.jsx";

const features = [
  {
    title: "For job seekers",
    desc: "Browse curated roles, apply in minutes, and track every application.",
  },
  {
    title: "For recruiters",
    desc: "Post jobs fast, manage applicants, and keep your pipeline organized.",
  },
  {
    title: "Smart matching",
    desc: "Signal-based sorting to surface the most relevant candidates.",
  },
  {
    title: "Built for speed",
    desc: "Modern, responsive experience so hiring workflows stay effortless.",
  },
];

const stats = [
  { label: "Jobs posted", value: "12k+" },
  { label: "Companies", value: "3.5k" },
  { label: "Candidates", value: "180k" },
];

const Landing = () => (
  <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#efe2cf] px-3 py-1 text-xs font-semibold text-[#2b2620] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Fresh roles added weekly
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Find your next developer job
          </h1>
          <p className="text-lg text-slate-600">
            Discover curated opportunities from top startups and enterprises.
            Apply once, track everything, and move faster.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#0c1323]"
          >
            Browse Jobs
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-[#cbb89f] px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-[#f2e8d8]"
          >
            Post a Job
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-[#c0b196] bg-white p-4 shadow-sm backdrop-blur">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center space-y-1">
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TalentShowcase features={features} />
    </div>
  </div>
);

export default Landing;
