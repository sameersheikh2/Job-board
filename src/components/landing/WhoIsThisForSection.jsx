import { motion } from "motion/react";
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
});

const WhoIsThisForSection = () => (
  <section className="bg-[#0f172a] py-14 text-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Who this is for
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Built for both sides of hiring
          </h2>
        </div>
        <p className="max-w-xl text-sm text-slate-300">
          Whether you are searching for your next role or hiring a team, our
          flow mirrors modern job platforms like Wellfound—fast, transparent,
          and signal-first.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {personas.map((persona, idx) => {
          const Icon = persona.icon;
          return (
            <motion.div
              key={persona.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              {...fadeUp(idx * 0.07)}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon size={18} />
                </div>
                <div className="text-lg font-semibold">{persona.title}</div>
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                {persona.bullets.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-auto inline-flex items-center justify-start text-sm font-semibold text-emerald-300 underline-offset-4 hover:text-emerald-200 hover:underline">
                {persona.cta}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhoIsThisForSection;
