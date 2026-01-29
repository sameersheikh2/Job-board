import { Briefcase, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";

const ProfileInfoCard = ({ profile }) => {
  const bio = profile?.bio || "Add a short summary about what you want next.";
  const headline = profile?.headline || "Add a headline";
  const experience = profile?.experience || "Experience level not set";

  return (
    <Card className="border-[#e6dccd]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl border border-[#efe6d8] bg-[#fbfaf8] px-4 py-3 text-sm text-slate-700 leading-relaxed sm:text-base">
          {bio}
        </div>
        <div className="rounded-xl border border-[#efe6d8] bg-white px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="rounded-lg border border-[#efe6d8] bg-[#fdfcf9] p-2 text-slate-600">
              <Briefcase className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Experience</p>
              <p className="text-sm text-slate-700">{headline}</p>
              <p className="text-xs text-slate-500">{experience}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
