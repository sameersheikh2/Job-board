import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ProfileInfoCard from "../components/profile/ProfileInfoCard.jsx";
import ProfileActivitySection from "../components/profile/ProfileActivitySection.jsx";
import ProfileMetaCard from "../components/profile/ProfileMetaCard.jsx";
import ProfileSkeleton from "../components/profile/ProfileSkeleton.jsx";
import ProfileSkillsCard from "../components/profile/ProfileSkillsCard.jsx";
import useAuthProfile from "../hooks/useAuthProfile.js";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.jsx";
import { Briefcase, UserRound } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  fetchApplications,
} from "../features/profileSlice/profileSlice.jsx";

const Profile = () => {
  const { user, profile, isLoading } = useAuthProfile();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appliedJobs = useSelector((state) => state.profile?.applications || []);
  const applicationsLoading = useSelector(
    (state) => state.profile?.applicationsStatus === "loading",
  );

  const [activeTab, setActiveTab] = useState("profile");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  // Fetch profile data on mount
  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, [dispatch]);

  useEffect(() => {
    if (activeTab === "applied") {
      dispatch(
        fetchApplications({
          limit: 100,
          page: 1,
        }),
      );
    }
  }, [dispatch, activeTab]);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilterBy(newFilter);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Profile
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Your Profile
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Review your account details and keep your profile fresh.
        </p>
      </div>

      <div className="mt-8">
        {isLoading && activeTab === "profile" ? (
          <ProfileSkeleton />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="h-11 w-full gap-1 rounded-lg border border-slate-200 bg-slate-100/80 p-1 shadow-sm sm:w-fit">
              <TabsTrigger
                value="profile"
                className="h-9 px-5 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                <UserRound className="h-5 w-5" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="applied"
                className="h-9 px-5 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                <Briefcase className="h-5 w-5" />
                Applied Jobs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="space-y-6">
                <ProfileHeader
                  user={user}
                  profile={profile}
                  onEdit={() => navigate("/profile-edit")}
                />
                <ProfileInfoCard profile={profile} />
                <ProfileSkillsCard profile={profile} />
                <ProfileMetaCard user={user} />
              </div>
            </TabsContent>
            <TabsContent value="applied">
              {applicationsLoading ? (
                <ProfileSkeleton />
              ) : (
                <ProfileActivitySection
                  appliedJobs={appliedJobs}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  filterBy={filterBy}
                  onFilterChange={handleFilterChange}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default Profile;
