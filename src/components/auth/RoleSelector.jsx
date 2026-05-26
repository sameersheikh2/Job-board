import { User, Briefcase } from "lucide-react";
import { cn } from "../../../lib/utils";

const roles = [
  {
    key: "job_seeker",
    title: "Job Seeker",
    description: "Browse and apply to curated tech jobs.",
    icon: User,
  },
  {
    key: "recruiter",
    title: "Recruiter",
    description: "Post jobs and manage applications.",
    icon: Briefcase,
  },
];

const RoleSelector = ({ value, onChange }) => {
  return (
    <div className="grid gap-3 mt-2">
      {roles.map((role) => {
        const active = value === role.key;
        const Icon = role.icon;
        return (
          <button
            type="button"
            key={role.key}
            onClick={() => onChange(role.key)}
            className={cn(
              "group cursor-pointer rounded-xl border p-4 text-left transition-all",
              "focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
              active
                ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-350 hover:shadow-xs",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border",
                  active
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-900",
                )}
              >
                <Icon size={16} />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold">{role.title}</div>
                <p
                  className={cn(
                    "text-xs",
                    active ? "text-white/80" : "text-slate-500",
                  )}
                >
                  {role.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
