// src/pages/Jobs.jsx (or wherever your Jobs component lives)
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useJobsQuery } from "../hooks/useJobsQuery";
import JobCard from "../components/jobs/JobCard";
import JobsSkeleton from "../components/jobs/JobsSkeleton";
import SearchBar from "../components/jobs/SearchBar";
import FilterPanel from "../components/jobs/FilterPanel";
import AppliedFiltersBadges from "../components/jobs/AppliedFiltersBadges";
import Pagination from "../components/jobs/Pagination";
import { Briefcase, ArrowUp } from "lucide-react";

const Jobs = () => {
  const [showGoToTop, setShowGoToTop] = useState(false);
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

  // Show "Go to Top" button when user scrolls down
  const handleScroll = () => {
    setShowGoToTop(window.scrollY > 300);
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeFilters = getActiveFilters();
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const totalPages = totalJobs > 0 ? Math.ceil(totalJobs / params.limit) : 0;

  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="rounded-lg bg-linear-to-br from-slate-900 to-slate-800 p-3">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Job Board
              </p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                Discover your next opportunity
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Handpicked tech roles from leading companies. Clear
                expectations, transparent timelines, and genuine feedback loops.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8 space-y-4">
          <SearchBar
            key={params.search}
            value={params.search}
            onChange={(search) => updateQueryParams({ search, page: 1 })}
          />

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
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
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Jobs Grid */}
          <div className="flex-1 min-w-0">
            {/* Results Summary */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {getResultsSummary()}
                </h2>
              </div>
            </div>

            {/* Active Filters - Only visible on mobile as inline display */}
            {activeFilters.length > 0 && (
              <div className="mb-6 overflow-x-auto pb-2 lg:hidden">
                <AppliedFiltersBadges
                  activeFilters={activeFilters}
                  onRemoveFilter={removeFilter}
                  onClearAll={clearAllFilters}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Jobs Grid */}
            {isLoading ? (
              <JobsSkeleton />
            ) : safeJobs.length > 0 ? (
              <>
                <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                  {safeJobs.map((job) => (
                    <JobCard key={job._id || job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={params.page}
                      totalPages={totalPages}
                      onPageChange={(page) => updateQueryParams({ page })}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white py-12 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <p className="text-base font-medium text-slate-900">
                  No roles found
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>

          {/* Filters Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-72 lg:shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                params={params}
                onFilterChange={(filters) =>
                  updateQueryParams({ ...filters, page: 1 })
                }
                onClearAll={clearAllFilters}
                isMobile={false}
              />
            </div>
          </aside>
        </div>

        {/* CTA Section for Non-Logged-In Users */}
        {!isLoggedIn && (
          <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-linear-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white">
                Save jobs and track applications
              </h3>
              <p className="mt-2 text-slate-200">
                Create an account to apply to roles, save favorites, and receive
                personalized recommendations.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:shadow-lg active:scale-95"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Go to Top Button - Mobile Only */}
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 lg:hidden z-40 h-12 w-12 rounded-full bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all active:scale-95 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
};

export default Jobs;
