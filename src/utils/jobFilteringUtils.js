// Filtering functions for recruiter jobs
export const FILTER_STATUS_OPTIONS_RECRUITER = [
  "all",
  "ACTIVE",
  "DRAFT",
  "CLOSED",
];

export const filterRecruiterJobs = (jobs, status = "all") => {
  if (status === "all") return jobs;

  return jobs.filter((job) => job.status === status);
};

export const getRecruiterJobStats = (jobs) => {
  return {
    ACTIVE: jobs.filter((job) => (job.status || "ACTIVE") === "ACTIVE").length,
    DRAFT: jobs.filter((job) => (job.status || "") === "DRAFT").length,
    CLOSED: jobs.filter((job) => (job.status || "") === "CLOSED").length,
    totalApplicants: jobs.reduce(
      (total, job) => total + (job.applicantsCount ?? job.applicants ?? 0),
      0,
    ),
  };
};

// Filtering functions for user applications
export const FILTER_STATUS_OPTIONS_USER = [
  "all",
  "applied",
  "reviewed",
  "accepted",
  "rejected",
];

export const filterUserApplications = (applications, status = "all") => {
  if (status === "all") return applications;

  return applications.filter((app) => app.status === status);
};

export const getUserApplicationStats = (applications) => {
  return {
    applied: applications.filter((a) => a.status === "applied").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };
};
