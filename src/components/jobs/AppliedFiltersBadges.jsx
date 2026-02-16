import { X } from "lucide-react";

const AppliedFiltersBadges = ({
  activeFilters,
  onRemoveFilter,
  onClearAll,
}) => {
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-slate-700">
        Active filters:
      </span>
      {activeFilters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => onRemoveFilter(filter.key)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 active:bg-slate-300"
        >
          <span>
            {filter.label}:{" "}
            <span className="font-semibold">{filter.value}</span>
          </span>
          <X className="h-4 w-4" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default AppliedFiltersBadges;
