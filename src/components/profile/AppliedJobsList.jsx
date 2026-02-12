import AppliedJobCard from "./AppliedJobCard.jsx";

const AppliedJobsList = ({ applications = [] }) => {
  const safeApplications = Array.isArray(applications) ? applications : [];

  if (!safeApplications.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center sm:px-8">
        <p className="text-base font-medium text-slate-700 sm:text-lg">
          No applications yet
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Start applying to roles that match your skills and experience.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {safeApplications.map((application) => (
        <AppliedJobCard key={application._id} application={application} />
      ))}
    </div>
  );
};

export default AppliedJobsList;
