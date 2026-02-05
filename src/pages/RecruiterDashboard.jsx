import { Briefcase, ClipboardList, Users } from "lucide-react";
import { useEffect, useMemo } from "react";
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

const RecruiterDashboard = () => {
  const dispatch = useDispatch();
  const { recruiterJobs, recruiterStatus, recruiterError } = useSelector(
    (state) => state.job,
  );
  const isLoading = recruiterStatus === "loading";

  useEffect(() => {
    dispatch(fetchRecruiterJobs());
  }, [dispatch]);

  const highlights = useMemo(() => {
    const safeJobs = Array.isArray(recruiterJobs) ? recruiterJobs : [];
    const activeCount = safeJobs.filter(
      (job) => (job.status || "ACTIVE").toUpperCase() === "ACTIVE",
    ).length;
    const applicantCount = safeJobs.reduce(
      (total, job) => total + (job.applicantsCount ?? job.applicants ?? 0),
      0,
    );

    return [
      {
        label: "Roles live",
        value: activeCount,
        caption: activeCount ? "Active roles in pipeline" : "No active roles",
        icon: Briefcase,
      },
      {
        label: "Applicants total",
        value: applicantCount,
        caption: applicantCount ? "Across all open roles" : "No applicants yet",
        icon: Users,
      },
    ];
  }, [recruiterJobs]);

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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#e6dccd] bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.label}
              </p>
              <span className="rounded-full border border-[#efe6d8] bg-[#fbfaf8] p-2">
                <item.icon className="h-4 w-4 text-slate-700" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {isLoading ? "—" : item.value}
            </p>
            <p className="text-xs text-slate-500">{item.caption}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="create" className="mt-8 space-y-6">
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
          <RecruiterJobForm />
        </TabsContent>
        <TabsContent value="jobs">
          <RecruiterJobsList
            jobs={recruiterJobs}
            isLoading={isLoading}
            error={recruiterError}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RecruiterDashboard;
