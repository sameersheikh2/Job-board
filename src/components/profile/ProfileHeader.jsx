import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { FileText, Github, Linkedin } from "lucide-react";

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

  // Style mapping for different link types
  const linkStyles = {
    GitHub: {
      filled:
        "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20 hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg hover:shadow-slate-900/30",
      empty:
        "border-dashed border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-500 hover:bg-slate-50",
    },
    LinkedIn: {
      filled:
        "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-600/30",
      empty:
        "border-dashed border-blue-200 text-blue-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50",
    },
    Resume: {
      filled:
        "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 hover:border-orange-600 hover:shadow-lg hover:shadow-orange-500/30",
      empty:
        "border-dashed border-orange-200 text-orange-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50",
    },
  };

  const links = [
    {
      label: "GitHub",
      href: profile?.links?.github,
      Icon: Github,
      emptyLabel: "Add GitHub",
    },
    {
      label: "LinkedIn",
      href: profile?.links?.linkedin,
      Icon: Linkedin,
      emptyLabel: "Add LinkedIn",
    },
    {
      label: "Resume",
      href: profile?.resumeUrl,
      Icon: FileText,
      emptyLabel: "Add Resume",
    },
  ];

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
            const styles = linkStyles[link.label];
            if (link.href) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 hover:-translate-y-1 ${styles.filled}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconComponent className="h-4 w-4" />
                  {link.label}
                </a>
              );
            }
            return (
              <span
                key={link.label}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 cursor-not-allowed ${styles.empty}`}
              >
                <IconComponent className="h-4 w-4" />
                {link.emptyLabel}
              </span>
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
