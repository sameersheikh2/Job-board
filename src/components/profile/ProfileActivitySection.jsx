import { Briefcase } from "lucide-react";
import ProfileActivityList from "./ProfileActivityList.jsx";

const ProfileActivitySection = ({ appliedJobs }) => {
  const items = appliedJobs;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
            Applied Jobs
          </p>
          <p className="text-sm text-slate-500">
            Track the roles you have applied to.
          </p>
        </div>
      </div>
      <ProfileActivityList
        items={items}
        emptyLabel="No applications yet. Start applying to roles."
      />
    </section>
  );
};

export default ProfileActivitySection;
