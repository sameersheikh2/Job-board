import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { FormField } from "../../../components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const FilterPanel = ({
  params,
  onFilterChange,
  onClearAll,
  isMobile = false,
  isOpen = false,
  onToggle,
}) => {
  const handleSelectChange = (field) => (value) => {
    onFilterChange({ [field]: value });
  };

  const handleReset = () => {
    onClearAll();
    if (isMobile && onToggle) {
      onToggle(false);
    }
  };

  const handleDone = () => {
    if (isMobile && onToggle) {
      onToggle(false);
    }
  };

  // Count active filters
  const activeFilterCount = [
    params.experience,
    params.employment,
    params.location,
    params.sort,
  ].filter((v) => v).length;

  if (isMobile) {
    return (
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => onToggle?.(!isOpen)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md active:shadow-sm"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-slate-600" />
            <span className="font-medium text-slate-900">Filters</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
            <div className="space-y-4 p-4 sm:p-5">
              <FormField label="Experience Level">
                <Select
                  value={params.experience}
                  onValueChange={handleSelectChange("experience")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher / Entry</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead / Manager</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Employment Type">
                <Select
                  value={params.employment}
                  onValueChange={handleSelectChange("employment")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Work Location">
                <Select
                  value={params.location}
                  onValueChange={handleSelectChange("location")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Anywhere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Sort by">
                <Select
                  value={params.sort}
                  onValueChange={handleSelectChange("sort")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="salary-desc">
                      Salary high to low
                    </SelectItem>
                    <SelectItem value="salary-asc">
                      Salary low to high
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="flex gap-3 border-t border-slate-200 p-4 sm:p-5">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleDone}
                className="flex-1 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Filters</p>
                <p className="text-xs text-slate-500">Refine your search</p>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200 active:bg-slate-300"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <FormField label="Experience Level">
            <Select
              value={params.experience}
              onValueChange={handleSelectChange("experience")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Fresher / Entry</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead / Manager</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Employment Type">
            <Select
              value={params.employment}
              onValueChange={handleSelectChange("employment")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Work Location">
            <Select
              value={params.location}
              onValueChange={handleSelectChange("location")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Anywhere" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Sort by">
            <Select
              value={params.sort}
              onValueChange={handleSelectChange("sort")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="salary-desc">Salary high to low</SelectItem>
                <SelectItem value="salary-asc">Salary low to high</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
