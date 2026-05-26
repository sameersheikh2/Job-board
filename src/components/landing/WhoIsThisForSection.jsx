import { Briefcase, Users, Building2 } from "lucide-react";

const personas = [
  {
    icon: Briefcase,
    title: "Job Seekers",
    bullets: [
      "Curated tech roles with clear salary bands",
      "Signal-based feed highlights the best matches",
      "Track applications without messy spreadsheets",
    ],
    cta: "Start applying",
  },
  {
    icon: Users,
    title: "Recruiters / Companies",
    bullets: [
      "Post roles quickly with structured fields",
      "Shortlist candidates in minutes, not hours",
      "Collaborate with hiring managers seamlessly",
    ],
    cta: "Post a job",
  },
  {
    icon: Building2,
    title: "Agencies / HR Teams",
    bullets: [
      "Manage multiple clients in one workspace",
      "Share shortlists with branded links",
      "Analytics-ready exports for reporting",
    ],
    cta: "Schedule a demo",
  },
];

const WhoIsThisForSection = () => (
  <section className="bg-slate-950 py-14 text-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-900 pb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Who this is for
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Built for both sides of hiring
          </h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400 leading-relaxed">
          Whether you are searching for your next role or hiring a team, our
          flow mirrors modern job platforms—fast, transparent,
          and signal-first.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {personas.map((persona) => {
          const Icon = persona.icon;
          return (
            <div
              key={persona.title}
              className="flex h-full flex-col gap-4 rounded-xl border border-slate-900 bg-slate-900/30 p-5 shadow-xs transition hover:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white border border-slate-800 shadow-sm">
                  <Icon size={16} />
                </div>
                <div className="text-base font-bold text-white">{persona.title}</div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-350">
                {persona.bullets.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-auto inline-flex items-center justify-start text-xs font-bold text-emerald-400 hover:text-emerald-350 transition-colors uppercase tracking-wider">
                {persona.cta} &rarr;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhoIsThisForSection;

