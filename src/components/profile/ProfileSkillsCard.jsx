import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";

const ProfileSkillsCard = ({ profile }) => (
  <Card className="border-[#e6dccd]">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
        Skills
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {profile.skills?.length ? (
          profile.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#e6dccd] bg-[#fbfaf8] px-3 py-1 text-xs font-semibold text-slate-700"
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

export default ProfileSkillsCard;
