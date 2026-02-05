import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { TypingAnimation } from "../../../components/ui/typing-animation";
import jobHighlights from "../../utils/jobHighlights";

const MotionDiv = motion.div;

const stats = [
  { label: "Jobs posted", value: "12k+" },
  { label: "Companies", value: "3.5k" },
  { label: "Candidates", value: "180k" },
];

const ROTATION_INTERVAL = 2000;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
});

const jobPop = (index) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: index * 0.08, ease: "easeOut" },
});

const HeroSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % jobHighlights.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const visibleJobs = Array.from(
    { length: 3 },
    (_, index) => jobHighlights[(startIndex + index) % jobHighlights.length],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <MotionDiv
            className="inline-flex items-center gap-2 rounded-full bg-[#efe2cf] px-3 py-1 text-xs font-semibold text-[#2b2620] shadow-sm"
            {...fadeUp(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Fresh roles added weekly
          </MotionDiv>

          <MotionDiv className="space-y-3" {...fadeUp(0.05)}>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Find your next
              <span className="block text-black">
                <TypingAnimation
                  words={[
                    "developer role",
                    "remote team",
                    "product mission",
                    "next big build",
                    "startup impact",
                    "leadership track",
                  ]}
                  cursorStyle="underscore"
                  loop
                  duration={85}
                  pauseDelay={1400}
                  startOnView={false}
                  className="leading-tight tracking-tight"
                />
              </span>
            </h1>
            <p className="text-lg text-slate-600">
              Discover curated opportunities from top startups and enterprises.
              Apply once, track everything, and move faster.
            </p>
          </MotionDiv>

          <MotionDiv
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            {...fadeUp(0.12)}
          >
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#0c1323] hover:shadow-xl cursor-pointer"
            >
              Browse jobs
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-[#cbb89f] px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-0.5 hover:bg-[#f2e8d8] hover:shadow-sm cursor-pointer"
            >
              I’m hiring
            </Link>
          </MotionDiv>

          <MotionDiv
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
          </MotionDiv>
        </div>

        <MotionDiv {...fadeUp(0.15)}>
          <div className="rounded-3xl border border-[#c0b196] bg-[#f9f6ef] p-6 shadow-xl backdrop-blur sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2a44] text-lg font-bold text-white">
                💼
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Featured jobs
                </div>
                <div className="text-xs text-slate-600">
                  Signal-based matches for builders & recruiters
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {visibleJobs.map(({ id, title, pay, meta }, index) => (
                <MotionDiv
                  key={`${startIndex}-${id}`}
                  className="rounded-2xl border border-[#c0b196] bg-white p-4 shadow-sm"
                  {...jobPop(index)}
                >
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>{title}</span>
                    <span className="text-emerald-600">{pay}</span>
                  </div>
                  <div className="text-xs text-slate-600">{meta}</div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default HeroSection;
