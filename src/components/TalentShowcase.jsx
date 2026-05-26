const jobHighlights = [
  {
    title: "Frontend Engineer",
    pay: "$140k",
    meta: "Remote · React · TypeScript",
  },
  { title: "Senior Backend", pay: "$170k", meta: "Remote · Node · Postgres" },
  {
    title: "Product Designer",
    pay: "$120k",
    meta: "Hybrid · Figma · Design Systems",
  },
];

const TalentShowcase = ({ features }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            JB
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              JobBoard Talent
            </div>
            <div className="text-xs text-slate-500">Personalized job feed</div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-900 bg-slate-950 p-4 text-white shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Today</div>
          <div className="space-y-2">
            {jobHighlights.map(({ title, pay, meta }) => (
              <div key={title} className="rounded-lg bg-white/5 p-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{title}</span>
                  <span className="text-emerald-400">{pay}</span>
                </div>
                <div className="text-xs text-slate-400">{meta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">
            Why teams choose us
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:bg-slate-50"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {title}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentShowcase;
