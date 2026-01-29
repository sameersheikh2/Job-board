import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ProfileInfoCard from "../components/profile/ProfileInfoCard.jsx";
import ProfileActivitySection from "../components/profile/ProfileActivitySection.jsx";
import ProfileMetaCard from "../components/profile/ProfileMetaCard.jsx";
import ProfileSkeleton from "../components/profile/ProfileSkeleton.jsx";
import ProfileSkillsCard from "../components/profile/ProfileSkillsCard.jsx";
import useMockAuth from "../hooks/useMockAuth.js";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.jsx";

const Profile = () => {
  const { user, profile, isLoading, appliedJobs } = useMockAuth();
  const navigate = useNavigate();

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
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="rounded-full border border-[#e6dccd] bg-white/80 p-1 shadow-sm">
              <TabsTrigger
                value="profile"
                className="rounded-full px-4 text-sm font-semibold text-slate-600 data-[state=active]:text-slate-900 cursor-pointer"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="applied"
                className="rounded-full px-4 text-sm font-semibold text-slate-600 data-[state=active]:text-slate-900 cursor-pointer"
              >
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
              <ProfileActivitySection appliedJobs={appliedJobs} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default Profile;
