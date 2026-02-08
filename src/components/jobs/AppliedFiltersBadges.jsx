import { X } from 'lucide-react';

const AppliedFiltersBadges = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-slate-600">Active filters:</span>
      {activeFilters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => onRemoveFilter(filter.key)}
          className="inline-flex items-center gap-1 rounded-full bg-[#e6dccd] px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-[#d4c8b8]"
        >
          {filter.label}: {filter.value}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm text-[#0f172a] transition hover:underline"
      >
        Clear all
      </button>
    </div>
  );
};

export default AppliedFiltersBadges;
