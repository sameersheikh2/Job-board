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
    <div className="rounded-3xl border border-[#c0b196] bg-[#f9f6ef] p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2a44] text-lg font-bold text-white">
            JB
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              JobBoard Talent
            </div>
            <div className="text-xs text-slate-600">Personalized job feed</div>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl bg-[#0f172a] p-4 text-white shadow-md">
          <div className="text-sm text-slate-200">Today</div>
          <div className="space-y-2">
            {jobHighlights.map(({ title, pay, meta }) => (
              <div key={title} className="rounded-xl bg-white/10 p-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{title}</span>
                  <span className="text-emerald-300">{pay}</span>
                </div>
                <div className="text-xs text-slate-200">{meta}</div>
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
                className="rounded-2xl border border-[#c0b196] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {title}
                </div>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentShowcase;
