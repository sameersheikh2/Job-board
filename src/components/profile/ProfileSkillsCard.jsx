import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";

const ProfileSkillsCard = ({ profile }) => {
  const safeProfile = profile ?? {};
  const rawSkills = safeProfile.skills;
  const skills = Array.isArray(rawSkills)
    ? rawSkills
    : typeof rawSkills === "string"
      ? rawSkills.split(/[\s,]+/).filter(Boolean)
      : [];

  return (
    <Card className="border-[#e6dccd]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.length ? (
            skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full border border-[#e6dccd] bg-[#fbfaf8] px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-500">No skills added yet.</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSkillsCard;
