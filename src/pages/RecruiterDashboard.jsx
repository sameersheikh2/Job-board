import { Briefcase, ClipboardList } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.jsx";
import RecruiterJobForm from "../components/recruiter/RecruiterJobForm.jsx";
import RecruiterJobsList from "../components/recruiter/RecruiterJobsList.jsx";
import { fetchRecruiterJobs } from "../features/jobSlice/jobSlice.jsx";
import ConfirmationDialog from "../utils/ConfirmationDialog.jsx";

const RecruiterDashboard = () => {
  const dispatch = useDispatch();
  const {
    recruiterJobs,
    recruiterStatus,
    recruiterError,
    recruiterTotalJobs,
    recruiterNumOfPages,
  } = useSelector((state) => state.job);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = recruiterStatus === "loading";

  useEffect(() => {
    const params = {
      sort: sortBy,
      page: currentPage,
      limit: 25,
    };
    if (filterBy !== "all") {
      params.status = filterBy;
    }
    dispatch(fetchRecruiterJobs(params));
  }, [dispatch, sortBy, filterBy, currentPage]);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilterBy(newFilter);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const jobEditHandler = useCallback((job) => {
    setSelectedJob(job);
    setActiveTab("create");
  }, []);

  const jobDeleteHandler = useCallback((job) => {
    setJobToDelete(job);
  }, []);
  const closeDeleteDialog = useCallback(() => {
    setJobToDelete(null);
  }, []);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (filterBy !== "all") {
      filters.push({
        key: "status",
        label: "Status",
        value: filterBy,
      });
    }
    if (sortBy !== "newest") {
      const sortLabels = {
        oldest: "Oldest first",
        most_applicant: "Most applicable",
        least_applicant: "Least applicable",
      };
      filters.push({
        key: "sort",
        label: "Sort",
        value: sortLabels[sortBy] || sortBy,
      });
    }
    return filters;
  }, [filterBy, sortBy]);

  const removeFilter = useCallback((filterKey) => {
    if (filterKey === "status") {
      setFilterBy("all");
    } else if (filterKey === "sort") {
      setSortBy("newest");
    }
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSortBy("newest");
    setFilterBy("all");
    setCurrentPage(1);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Recruiter studio
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Recruiter command center
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Launch roles, track applicants, and keep your pipeline moving.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v)}
        className="mt-8 space-y-6"
      >
        <TabsList className="h-11 w-full gap-1 rounded-lg border border-slate-200 bg-slate-100/80 p-1 shadow-sm sm:w-fit">
          <TabsTrigger
            value="create"
            className="h-9 px-5 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
          >
            <ClipboardList className="h-5 w-5" />
            Create job
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="h-9 px-5 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
          >
            <Briefcase className="h-5 w-5" />
            My jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <RecruiterJobForm
            job={selectedJob}
            onSuccess={() => {
              setSelectedJob(null);
              dispatch(
                fetchRecruiterJobs({ sort: sortBy, page: 1, limit: 25 }),
              );
            }}
            onCancel={() => setSelectedJob(null)}
          />
        </TabsContent>
        <TabsContent value="jobs">
          <RecruiterJobsList
            jobs={recruiterJobs}
            isLoading={isLoading}
            error={recruiterError}
            onEdit={jobEditHandler}
            onDelete={jobDeleteHandler}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            filterBy={filterBy}
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onClearAllFilters={clearAllFilters}
            currentPage={currentPage}
            totalPages={recruiterNumOfPages}
            onPageChange={handlePageChange}
            totalJobs={recruiterTotalJobs}
          />
        </TabsContent>
      </Tabs>
      <ConfirmationDialog
        open={!!jobToDelete} // true when we have a job
        onOpenChange={(open) => !open && closeDeleteDialog()}
        title="Delete job"
        description={`Are you sure you want to delete "${jobToDelete?.title + " Job" || "this job"}"? This action cannot be undone.`}
        onConfirm={() => {
          closeDeleteDialog();
        }}
        onCancel={closeDeleteDialog}
      />
    </section>
  );
};

export default RecruiterDashboard;
