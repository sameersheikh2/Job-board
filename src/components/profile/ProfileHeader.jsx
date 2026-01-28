import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { BadgeCheck, Mail, MapPin } from "lucide-react";

const ProfileHeader = ({ user, profile, onEdit }) => {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#e6dccd] bg-white px-6 py-7 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Avatar className="h-24 w-24 ring-2 ring-white shadow-md sm:h-24 sm:w-24 lg:h-28 lg:w-28">
          <AvatarImage src="" alt={user.name} />
          <AvatarFallback className="text-base">{initials}</AvatarFallback>
        </Avatar>
        <div className="w-full text-left">
          <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            {user.name}
          </p>
          <p className="text-base text-slate-700 sm:text-lg">
            {profile.headline || "Add a headline"}
          </p>
          <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-slate-500">
            <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            {user.role.replace("_", " ")}
          </p>
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Email
              </p>
              <p className="flex items-center gap-2 text-sm font-medium text-slate-700 sm:text-base">
                <Mail className="h-4 w-4 text-slate-500 sm:h-5 sm:w-5" />
                {user.email}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Location
              </p>
              <p className="flex items-center gap-2 text-sm font-medium text-slate-700 sm:text-base">
                <MapPin className="h-4 w-4 text-slate-500 sm:h-5 sm:w-5" />
                {profile.location || "Location not set"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full border-[#d6c7b0] text-slate-700 hover:text-slate-900 cursor-pointer font-semibold sm:w-auto"
        onClick={onEdit}
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileHeader;
