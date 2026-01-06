import { Link } from "react-router-dom";
import { motion } from "motion/react";

const stats = [
  { label: "Jobs posted", value: "12k+" },
  { label: "Companies", value: "3.5k" },
  { label: "Candidates", value: "180k" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
});

const HeroSection = () => (
  <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-8">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-[#efe2cf] px-3 py-1 text-xs font-semibold text-[#2b2620] shadow-sm"
          {...fadeUp(0)}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Fresh roles added weekly
        </motion.div>

        <motion.div className="space-y-3" {...fadeUp(0.05)}>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl border-red-500 border-dashed p-2 border-3 rounded-xl">
            Find your next developer job
          </h1>
          <p className="text-lg text-slate-600">
            Discover curated opportunities from top startups and enterprises.
            Apply once, track everything, and move faster.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
          {...fadeUp(0.12)}
        >
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#0c1323] hover:shadow-xl cursor-pointer"
          >
            Create profile
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-[#cbb89f] px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-0.5 hover:bg-[#f2e8d8] hover:shadow-sm cursor-pointer"
          >
            I’m hiring
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-4 rounded-2xl border border-[#c0b196] bg-white p-4 shadow-sm backdrop-blur"
          {...fadeUp(0.18)}
        >
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center space-y-1">
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.15)}>
        <div className="rounded-3xl border border-[#c0b196] bg-[#f9f6ef] p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2a44] text-lg font-bold text-white">
              JB
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Wellfound-inspired spotlight
              </div>
              <div className="text-xs text-slate-600">
                Signal-based matches for builders & recruiters
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              {
                title: "Frontend Engineer",
                pay: "$140k",
                meta: "Remote · React · TypeScript",
              },
              {
                title: "Senior Backend",
                pay: "$170k",
                meta: "Remote · Node · Postgres",
              },
              {
                title: "Product Designer",
                pay: "$120k",
                meta: "Hybrid · Figma · Design Systems",
              },
            ].map(({ title, pay, meta }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#c0b196] bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                  <span>{title}</span>
                  <span className="text-emerald-600">{pay}</span>
                </div>
                <div className="text-xs text-slate-600">{meta}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default HeroSection;
