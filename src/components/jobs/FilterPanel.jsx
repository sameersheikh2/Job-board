import { SlidersHorizontal, X } from "lucide-react";
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

  if (isMobile) {
    return (
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => onToggle?.(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-[#e6dccd] bg-white/90 p-3 shadow-sm backdrop-blur"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium text-slate-900">Filters</span>
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
            {isOpen ? "Close" : "Tap to expand"}
          </span>
        </button>

        {isOpen && (
          <div className="mt-3 rounded-lg border border-[#e6dccd] bg-white/90 p-4 shadow-sm backdrop-blur">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <FormField label="Experience">
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
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Employment">
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

              <FormField label="Location">
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
                    <SelectItem value="onsite">Onsite</SelectItem>
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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 rounded-lg border border-[#e6dccd] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#f6f5f3]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleDone}
                className="flex-1 rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0c1323]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <div className="rounded-2xl border border-[#e6dccd] bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Filters
          </p>
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-slate-700"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        </div>

        <div className="grid gap-4">
          <FormField label="Experience">
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
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Employment">
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

          <FormField label="Location">
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
                <SelectItem value="onsite">Onsite</SelectItem>
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
