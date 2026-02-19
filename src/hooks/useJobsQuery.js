import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchJobs } from "../features/jobSlice/jobSlice";

// These are the default values for all filters
const DEFAULT_PARAMS = {
  search: "", // what the user typed in the search box
  location: "", // remote, hybrid, onsite
  employment: "", // full-time, part-time, etc.
  experience: "", // fresher, junior, etc.
  sort: "newest", // default sorting
  page: 1, // current page of results
  limit: 25, // how many jobs per page (we never change this)
};

// Human-readable labels for the filters (used in UI)
const FILTER_LABELS = {
  search: "Search",
  location: "Location",
  employment: "Employment",
  experience: "Experience",
  sort: "Sort",
};

// Options for dropdowns — we map the short key to a nice display name
const LOCATION_OPTIONS = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "Onsite",
};
const EMPLOYMENT_OPTIONS = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};
const EXPERIENCE_OPTIONS = {
  fresher: "Fresher / Entry",
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
};
const SORT_OPTIONS = {
  newest: "Newest first",
  oldest: "Oldest first",
  "salary-desc": "Salary high to low",
  "salary-asc": "Salary low to high",
};

// This is the custom hook that other components will use
export const useJobsQuery = () => {
  // Redux tools
  const dispatch = useDispatch(); // to send actions (like fetchJobs)
  const { jobListings, listingsStatus, listingsError, listingsTotalJobs } =
    useSelector((state) => state.job); // get job data from Redux store

  // React Router tool to read and update URL search params (?search=react&location=remote etc.)
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper: Get current params from URL and fill in defaults if missing
  const getCurrentParams = useCallback(() => {
    const paramsFromUrl = {};

    // Loop through all params in the URL (e.g., ?search=react&page=2)
    for (const [key, value] of searchParams.entries()) {
      if (key === "page") {
        // page must be a number
        paramsFromUrl[key] = parseInt(value) || DEFAULT_PARAMS.page;
      } else {
        paramsFromUrl[key] = value || DEFAULT_PARAMS[key];
      }
    }

    // Return defaults + whatever was in the URL
    return { ...DEFAULT_PARAMS, ...paramsFromUrl };
  }, [searchParams]);

  // Helper: Update URL params when user changes filters
  const updateUrlParams = useCallback(
    (newChanges) => {
      const current = getCurrentParams();
      const updated = { ...current, ...newChanges };

      // Clean up: remove params that are back to default (except limit)
      const paramsToKeepInUrl = {};
      Object.entries(updated).forEach(([key, value]) => {
        if (value && value !== DEFAULT_PARAMS[key] && key !== "limit") {
          paramsToKeepInUrl[key] = value;
        }
      });

      // Actually update the URL
      setSearchParams(paramsToKeepInUrl);
    },
    [getCurrentParams, setSearchParams],
  );

  // Helper: Fetch jobs from the API using current params
  const loadJobs = useCallback(() => {
    const currentParams = getCurrentParams();

    // Build a clean object with only non-default params for the API
    const paramsForApi = {};
    Object.entries(currentParams).forEach(([key, value]) => {
      if (value && value !== DEFAULT_PARAMS[key]) {
        paramsForApi[key] = value;
      }
    });

    dispatch(fetchJobs(paramsForApi));
  }, [dispatch, getCurrentParams]);

  // Remove one filter (set it back to default)
  const removeOneFilter = useCallback(
    (filterName) => {
      const changes = { [filterName]: DEFAULT_PARAMS[filterName] };
      if (filterName === "page") changes.page = 1; // reset to page 1
      updateUrlParams(changes);
    },
    [updateUrlParams],
  );

  // Clear all filters (reset everything except limit)
  const clearAllFilters = useCallback(() => {
    updateUrlParams({
      search: "",
      location: "",
      employment: "",
      experience: "",
      sort: "newest",
      page: 1,
    });
  }, [updateUrlParams]);

  // Get list of currently active filters (for showing filter chips/tags)
  const getActiveFilters = useCallback(() => {
    const params = getCurrentParams();
    const active = [];

    Object.entries(params).forEach(([key, value]) => {
      // Skip defaults, page, and limit
      if (
        value &&
        value !== DEFAULT_PARAMS[key] &&
        key !== "page" &&
        key !== "limit"
      ) {
        let displayValue = value;

        // Convert short keys to nice readable text
        if (key === "location") displayValue = LOCATION_OPTIONS[value] || value;
        if (key === "employment")
          displayValue = EMPLOYMENT_OPTIONS[value] || value;
        if (key === "experience")
          displayValue = EXPERIENCE_OPTIONS[value] || value;
        if (key === "sort") displayValue = SORT_OPTIONS[value] || value;

        active.push({
          key, // e.g., "location"
          label: FILTER_LABELS[key] || key, // e.g., "Location"
          value: displayValue, // e.g., "Remote"
        });
      }
    });

    return active;
  }, [getCurrentParams]);

  // Create a nice summary text like "Showing 42 jobs" or "12 jobs for 'react' • Remote"
  const getSummaryText = useCallback(() => {
    const activeFilters = getActiveFilters();

    if (activeFilters.length === 0) {
      return `Showing ${listingsTotalJobs} jobs`;
    }

    const searchFilter = activeFilters.find((f) => f.key === "search");
    const otherFilters = activeFilters.filter((f) => f.key !== "search");

    if (searchFilter && otherFilters.length === 0) {
      return `Search results for '${searchFilter.value}'`;
    }

    if (searchFilter && otherFilters.length > 0) {
      const othersText = otherFilters.map((f) => f.value).join(" • ");
      return `${listingsTotalJobs} jobs for '${searchFilter.value}' • ${othersText}`;
    }

    const othersText = otherFilters.map((f) => f.value).join(" • ");
    return `${listingsTotalJobs} jobs for ${othersText}`;
  }, [getActiveFilters, listingsTotalJobs]);

  // Whenever URL params change, automatically fetch new jobs
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Return everything other components need
  return {
    jobs: jobListings, // array of job data
    isLoading: listingsStatus === "loading",
    error: listingsError,
    totalJobs: listingsTotalJobs, // total count from backend

    params: getCurrentParams(), // current filter values

    updateQueryParams: updateUrlParams, // call this to change filters
    removeFilter: removeOneFilter,
    clearAllFilters,

    getActiveFilters, // list of active filter chips
    getResultsSummary: getSummaryText, // nice text for the header

    // Dropdown options (so components can build selects)
    LOCATION_OPTIONS,
    EMPLOYMENT_OPTIONS,
    EXPERIENCE_OPTIONS,
    SORT_OPTIONS,
  };
};
