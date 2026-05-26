import { useState } from "react";
import { FormField, FormInput } from "../../../components/ui/form-field.jsx";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const JobsFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    search: "",
    location: "",
    employment: "",
    experience: "",
    sort: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mt-6 lg:sticky lg:top-5 lg:z-20 lg:mt-8">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xs backdrop-blur sm:p-5 lg:p-4">
        <div className="hidden items-center justify-between lg:flex">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">
            Filters
          </p>
          <p className="text-xs text-slate-500">Refine results quickly.</p>
        </div>

        <div className="lg:hidden">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FormInput
                className="flex-1"
                placeholder="Search roles, companies"
                aria-label="Search jobs"
                name="search"
                value={formValues.search}
                onChange={handleChange}
              />
              <button
                type="button"
                aria-label="Run search"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs transition hover:bg-slate-800"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            <details
              className="group rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xs"
              open={isOpen}
              onToggle={(event) => setIsOpen(event.currentTarget.open)}
            >
              <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </span>
                <span className="text-[0.65rem] uppercase tracking-wider text-slate-400">
                  Tap to expand
                </span>
              </summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField label="Experience">
                  <Select
                    value={formValues.experience}
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
                    value={formValues.employment}
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
                    value={formValues.location}
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
                    value={formValues.sort}
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
              <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            </details>
          </div>
        </div>

        <div className="mt-4 hidden gap-4 lg:grid lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <FormField label="Search">
            <div className="flex items-center gap-2">
              <FormInput
                className="flex-1"
                placeholder="Role, company, or skill"
                name="search"
                value={formValues.search}
                onChange={handleChange}
              />
              <button
                type="button"
                aria-label="Run search"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs transition hover:bg-slate-800"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </FormField>

          <FormField label="Experience">
            <Select
              value={formValues.experience}
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
              value={formValues.employment}
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
              value={formValues.location}
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
              value={formValues.sort}
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

export default JobsFilters;
