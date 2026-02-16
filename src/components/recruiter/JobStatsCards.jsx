// src/components/recruiter/JobStatsCards.jsx
export const JobStatsCards = ({ stats }) => {
  return (
    <div className="rounded-3xl border border-[#e6dccd] bg-white/90 p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Roles in flight</h2>
      <p className="text-sm text-slate-600">
        Monitor active roles, drafts, and responses in one place.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Active
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.active}
          </p>
        </div>
        <div className="rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Drafts
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.draft}
          </p>
        </div>
        <div className="rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Applicants
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.totalApplicants}
          </p>
        </div>
      </div>
    </div>
  );
};
