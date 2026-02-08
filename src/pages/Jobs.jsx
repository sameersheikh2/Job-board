// src/pages/Jobs.jsx (or wherever your Jobs component lives)
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useJobsQuery } from "../hooks/useJobsQuery";
import JobCard from "../components/jobs/JobCard";
import JobsSkeleton from "../components/jobs/JobsSkeleton";
import SearchBar from "../components/jobs/SearchBar";
import FilterPanel from "../components/jobs/FilterPanel";
import AppliedFiltersBadges from "../components/jobs/AppliedFiltersBadges";
import Pagination from "../components/jobs/Pagination";

const Jobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  const {
    jobs,
    isLoading,
    error,
    totalJobs,
    params,
    updateQueryParams,
    removeFilter,
    clearAllFilters,
    getActiveFilters,
    getResultsSummary,
  } = useJobsQuery();

  const activeFilters = getActiveFilters();
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const totalPages = totalJobs > 0 ? Math.ceil(totalJobs / params.limit) : 0;

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

      <div className="mt-8 space-y-4">
        <SearchBar
          key={params.search}
          value={params.search}
          onChange={(search) => updateQueryParams({ search, page: 1 })}
        />

        <FilterPanel
          params={params}
          onFilterChange={(filters) =>
            updateQueryParams({ ...filters, page: 1 })
          }
          onClearAll={clearAllFilters}
          isMobile={true}
          isOpen={isFilterOpen}
          onToggle={setIsFilterOpen}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-lg font-medium text-slate-900">
              {getResultsSummary()}
            </p>
          </div>

          {activeFilters.length > 0 && (
            <div className="mb-6">
              <AppliedFiltersBadges
                activeFilters={activeFilters}
                onRemoveFilter={removeFilter}
                onClearAll={clearAllFilters}
              />
            </div>
          )}

          {error && <p className="mt-6 text-sm text-rose-500">{error}</p>}

          {isLoading ? (
            <JobsSkeleton />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {safeJobs.map((job) => (
                <JobCard key={job._id || job.id} job={job} />
              ))}
            </div>
          )}

          {!isLoading && !safeJobs.length && !error && (
            <p className="mt-6 text-sm text-slate-500">
              No roles available right now. Check back soon.
            </p>
          )}

          {!isLoading && totalPages > 1 && (
            <Pagination
              currentPage={params.page}
              totalPages={totalPages}
              onPageChange={(page) => updateQueryParams({ page })}
            />
          )}
        </div>

        <div className="hidden lg:block lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <FilterPanel
              params={params}
              onFilterChange={(filters) =>
                updateQueryParams({ ...filters, page: 1 })
              }
              onClearAll={clearAllFilters}
            />
          </div>
        </div>
      </div>

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
