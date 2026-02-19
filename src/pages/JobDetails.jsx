import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { fetchJobById } from "../features/jobSlice/jobSlice.jsx";
import JobDetailsContent from "../components/jobs/JobDetailsContent.jsx";
import JobDetailsSidebar from "../components/jobs/JobDetailsSidebar.jsx";
import JobDetailsSkeleton from "../components/jobs/JobDetailsSkeleton.jsx";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const {
    jobDetails,
    jobDetailsStatus,
    jobDetailsError,
    hasApplied,
    applicationStatus,
  } = useSelector((state) => state.job);
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
    if (hasApplied) {
      return {
        label: `Already Applied (${applicationStatus})`,
        disabled: true,
      };
    }
    if (isLoggedIn) {
      return { label: "Apply now", to: "/profile-edit" };
    }
    return { label: "Login to apply", to: "/login" };
  }, [isLoggedIn, user?.role, hasApplied, applicationStatus]);

  const handleApply = () => {
    if (user?.role === "recruiter") {
      navigate("/recruiter-dashboard");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: `/jobs/${jobId}` } });
      return;
    }

    navigate("/profile-edit", {
      state: {
        returnTo: `/jobs/${jobId}`,
        isApplyFlow: true,
        jobId: jobId,
      },
    });
  };

  if (jobDetailsStatus === "loading") {
    return <JobDetailsSkeleton />;
  }

  if (jobDetailsError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </button>
        <p className="mt-6 text-sm text-rose-500">{jobDetailsError}</p>
      </section>
    );
  }

  if (!jobDetails) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </button>
        <p className="mt-6 text-sm text-slate-500">
          This role is no longer available.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <JobDetailsContent
          jobDetails={jobDetails}
          applyCta={applyCta}
          onApply={handleApply}
          isDisabled={applyCta.disabled}
          isRecruiter={user?.role === "recruiter"}
        />
        <JobDetailsSidebar
          jobDetails={jobDetails}
          applyCta={applyCta}
          onApply={handleApply}
          isDisabled={applyCta.disabled}
          isRecruiter={user?.role === "recruiter"}
        />
      </div>
    </section>
  );
};

export default JobDetails;
