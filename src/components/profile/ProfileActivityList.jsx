import { Building2, Calendar, MapPin } from "lucide-react";

const statusStyles = {
  Applied: "bg-slate-100 text-slate-700",
  Interview: "bg-amber-100 text-amber-700",
  Active: "bg-emerald-100 text-emerald-700",
  Closed: "bg-rose-100 text-rose-700",
};

const ProfileActivityList = ({ items, emptyLabel }) => {
  const safeItems = Array.isArray(items) ? items : [];

  if (!safeItems.length) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-3">
      {safeItems.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-[#e6dccd] bg-white px-4 py-3 shadow-sm transition hover:border-[#cbb79e] cursor-pointer"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900 sm:text-base">
                {item.title}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {item.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide ${
                statusStyles[item.status] || "bg-slate-100 text-slate-700"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileActivityList;
