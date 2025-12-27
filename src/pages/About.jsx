const highlights = [
  {
    title: "Built for builders",
    desc: "A focused job board for engineers, designers, and product folks who want momentum.",
  },
  {
    title: "Recruiter-friendly",
    desc: "Post roles quickly, manage applicants, and keep hiring workflows lightweight.",
  },
  {
    title: "Quality over noise",
    desc: "Curated, signal-based listings so candidates and teams spend time wisely.",
  },
];

const About = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0f172a]">
          About
        </p>
        <h1 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
          A job board crafted for modern teams
        </h1>
        <p className="text-lg text-slate-700">
          We pair a clean candidate experience with simple hiring tools so both
          sides move faster.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map(({ title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-[#c0b196] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-sm font-semibold text-[#0f172a]">{title}</div>
            <p className="mt-2 text-sm text-slate-700">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-[#0f172a]">
            How it works
          </h2>
          <p className="text-slate-700">
            Candidates create one profile, get matched to curated roles, and
            track applications in one place. Recruiters post in minutes and
            review a signal-ranked pipeline instead of sifting through noise.
          </p>
        </div>
        <div className="rounded-2xl border border-[#c0b196] bg-white p-5 text-sm text-slate-700 shadow-sm">
          <ul className="space-y-2 list-disc list-inside">
            <li>Curated tech roles with clear compensation signals</li>
            <li>Simple application flow and saved progress for candidates</li>
            <li>Pipeline snapshot for recruiters to triage quickly</li>
            <li>Mobile-friendly UI so hiring can keep moving</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
