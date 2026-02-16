// Sorting functions for recruiter jobs
export const SORT_OPTIONS_RECRUITER = {
  newest: "Newest First",
  oldest: "Oldest First",
  "most-applicants": "Most Applicants",
  "least-applicants": "Least Applicants",
};

export const sortRecruiterJobs = (jobs, sortBy = "newest") => {
  const sorted = [...jobs];

  switch (sortBy) {
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

    case "most-applicants":
      return sorted.sort(
        (a, b) =>
          (b.applicantsCount ?? b.applicants ?? 0) -
          (a.applicantsCount ?? a.applicants ?? 0),
      );

    case "least-applicants":
      return sorted.sort(
        (a, b) =>
          (a.applicantsCount ?? a.applicants ?? 0) -
          (b.applicantsCount ?? b.applicants ?? 0),
      );

    case "newest":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
  }
};

// Sorting functions for user applications
export const SORT_OPTIONS_USER = {
  recent: "Most Recent",
  oldest: "Oldest First",
  alphabetical: "Job Title (A-Z)",
};

export const sortUserApplications = (applications, sortBy = "recent") => {
  const sorted = [...applications];

  switch (sortBy) {
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.appliedAt) - new Date(b.appliedAt),
      );

    case "alphabetical":
      return sorted.sort((a, b) =>
        (a.job?.title || "").localeCompare(b.job?.title || ""),
      );

    case "recent":
    default:
      return sorted.sort(
        (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt),
      );
  }
};
