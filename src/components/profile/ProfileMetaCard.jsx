import { Calendar, ShieldCheck, UserCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";

const ProfileMetaCard = ({ user }) => {
  const safeUser = user ?? {};
  const roleLabel = safeUser.role ? safeUser.role.replace("_", " ") : "Not set";
  const memberSince = safeUser.createdAt
    ? new Date(safeUser.createdAt).toLocaleDateString()
    : "Not set";
  const statusLabel = safeUser.isVerified ? "Verified" : "Incomplete";

  const meta = [
    { label: "Role", value: roleLabel, icon: UserCircle },
    {
      label: "Member since",
      value: memberSince,
      icon: Calendar,
    },
    {
      label: "Status",
      value: statusLabel,
      icon: ShieldCheck,
    },
  ];

  return (
    <Card className="border-[#e6dccd]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {meta.map((item) => (
          <div key={item.label}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfileMetaCard;
