import { Briefcase, CheckCircle2 } from "lucide-react";

const tabs = [
  { key: "applied", label: "Applied Jobs", icon: CheckCircle2 },
  { key: "my", label: "My Jobs", icon: Briefcase },
];

const ProfileActivityTabs = ({ activeKey, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => onChange(tab.key)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
          activeKey === tab.key
            ? "border-[#1f2933] bg-[#1f2933] text-white"
            : "border-[#e6dccd] text-slate-700 hover:border-[#1f2933]"
        }`}
      >
        <tab.icon className="h-3.5 w-3.5" />
        {tab.label}
      </button>
    ))}
  </div>
);

export default ProfileActivityTabs;
