import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { fetchJobById } from "../features/jobSlice/jobSlice.jsx";
import JobDetailsContent from "../components/jobs/JobDetailsContent.jsx";
import JobDetailsSidebar from "../components/jobs/JobDetailsSidebar.jsx";
import JobDetailsSkeleton from "../components/jobs/JobDetailsSkeleton.jsx";

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { jobDetails, jobDetailsStatus, jobDetailsError } = useSelector(
    (state) => state.job,
  );
  const { user, isLoggedIn } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, jobId]);

  const applyCta = useMemo(() => {
    if (user?.role === "recruiter") {
      return { label: "Manage in dashboard", to: "/recruiter-dashboard" };
    }
    if (isLoggedIn) {
      return { label: "Apply now", to: "/profile" };
    }
    return { label: "Login to apply", to: "/login" };
  }, [isLoggedIn, user?.role]);

  if (jobDetailsStatus === "loading") {
    return <JobDetailsSkeleton />;
  }

  if (jobDetailsError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
        <p className="mt-6 text-sm text-rose-500">{jobDetailsError}</p>
      </section>
    );
  }

  if (!jobDetails) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
        <p className="mt-6 text-sm text-slate-500">
          This role is no longer available.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <JobDetailsContent jobDetails={jobDetails} applyCta={applyCta} />
        <JobDetailsSidebar jobDetails={jobDetails} applyCta={applyCta} />
      </div>
    </section>
  );
};

export default JobDetails;
