import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { FileText, Globe, Linkedin } from "lucide-react";

const ProfileHeader = ({ user, profile, onEdit }) => {
  const displayName = user?.name || "Your name";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const headline = profile?.headline || "Add a headline";
  const location = profile?.location || "Location not set";
  const links = [
    {
      label: "LinkedIn",
      href: profile?.links?.linkedin,
      Icon: Linkedin,
    },
    {
      label: "Portfolio",
      href: profile?.links?.portfolio,
      Icon: Globe,
    },
    {
      label: "Resume",
      href: profile?.resumeUrl,
      Icon: FileText,
    },
  ].filter((link) => Boolean(link.href));

  return (
    <div className="rounded-2xl border border-[#e6dccd] bg-white px-6 py-6 shadow-sm sm:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20 ring-2 ring-white shadow-md sm:h-24 sm:w-24">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="text-base">
              {initials || "NA"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {displayName}
            </p>
            <p className="text-sm font-medium text-slate-700 sm:text-base">
              {headline}
            </p>
            <p className="text-xs text-slate-500 sm:text-sm">{location}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {links.map((link) => {
            const IconComponent = link.Icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full border border-[#e6dccd] bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#cbb79e]"
                target="_blank"
                rel="noreferrer"
              >
                <IconComponent className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
          <Button
            variant="outline"
            className="w-full border-[#d6c7b0] text-slate-700 hover:text-slate-900 cursor-pointer font-semibold sm:w-auto"
            onClick={onEdit}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
