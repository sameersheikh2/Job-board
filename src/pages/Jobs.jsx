import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobSlice/jobSlice.jsx";
import JobCard from "../components/jobs/JobCard.jsx";
import JobsFilters from "../components/jobs/JobsFilters.jsx";
import JobsSkeleton from "../components/jobs/JobsSkeleton.jsx";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobListings, listingsStatus, listingsError } = useSelector(
    (state) => state.job,
  );
  const { isLoggedIn } = useSelector((state) => state.auth || {});
  const isLoading = listingsStatus === "loading";
  const safeJobs = Array.isArray(jobListings) ? jobListings : [];

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Job board
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore curated tech roles
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Handpicked openings from recruiters who share clear expectations,
            timelines, and feedback loops.
          </p>
        </div>
      </div>

      <JobsFilters />

      {listingsError && (
        <p className="mt-6 text-sm text-rose-500">{listingsError}</p>
      )}
      {isLoading ? (
        <JobsSkeleton />
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {safeJobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      )}

      {!isLoading && !safeJobs.length && !listingsError && (
        <p className="mt-6 text-sm text-slate-500">
          No roles available right now. Check back soon.
        </p>
      )}

      {!isLoggedIn && (
        <div className="mt-10 rounded-2xl border border-[#e6dccd] bg-white/90 p-6 text-center shadow-sm">
          <p className="text-sm text-slate-600">
            Want to save roles and track applications?
          </p>
          <Link
            to="/login"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0c1323]"
          >
            Log in to explore
          </Link>
        </div>
      )}
    </section>
  );
};

export default Jobs;
