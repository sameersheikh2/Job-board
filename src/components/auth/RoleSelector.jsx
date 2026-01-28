import { motion } from "motion/react";
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
      {roles.map((role, idx) => {
        const active = value === role.key;
        const Icon = role.icon;
        return (
          <motion.button
            type="button"
            key={role.key}
            onClick={() => onChange(role.key)}
            className={cn(
              "group cursor-pointer rounded-2xl border p-4 text-left transition-all",
              "focus:outline-none focus:ring-2 focus:ring-[#0f172a] focus:ring-offset-2",
              active
                ? "border-[#0f172a] bg-[#0f172a] text-white shadow-lg"
                : "border-[#d8cab8] bg-white hover:-translate-y-0.5 hover:shadow-md",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 ">
              <div
                className={cn(
                  "flex  h-10 w-10 items-center justify-center rounded-full border",
                  active
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-[#d8cab8] bg-[#f9f6ef] text-[#0f172a]",
                )}
              >
                <Icon size={18} />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold">{role.title}</div>
                <p
                  className={cn(
                    "text-xs",
                    active ? "text-white/80" : "text-slate-600",
                  )}
                >
                  {role.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
