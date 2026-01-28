import { FileText, Mail, MapPin, Sparkles, UserSquare2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";

const ProfileInfoCard = ({ user, profile }) => {
  const items = [
    { label: "Email", value: user.email, icon: Mail },
    { label: "Headline", value: profile.headline, icon: Sparkles },
    { label: "Location", value: profile.location, icon: MapPin },
  ];

  return (
    <Card className="border-[#e6dccd]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <UserSquare2 className="h-5 w-5 sm:h-6 sm:w-6" />
          Basic Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="text-sm">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
              {item.value || "N/A"}
            </p>
          </div>
        ))}
        <div className="text-sm">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            Bio
          </p>
          <div className="mt-2 rounded-lg border border-[#efe6d8] bg-[#fbfaf8] px-4 py-3 text-sm text-slate-700 leading-relaxed sm:text-base">
            {profile.bio || "N/A"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
