// src/components/recruiter/SortFilterControls.jsx
import React from "react";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../../components/ui/dropdown-menu";

export const SortFilterControls = ({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  sortOptions = {},
  filterOptions = [],
  statusCounts = {},
  title = "Items",
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        {/* Filter by Status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {filterBy !== "all" && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                  1
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {filterOptions.map((option, index) => (
              <React.Fragment key={option}>
                {/* Add separator after "All" option */}
                {index === 1 && <DropdownMenuSeparator />}
                <DropdownMenuItem onClick={() => onFilterChange(option)}>
                  <span className="capitalize">
                    {option === "all" ? "All" : option}
                  </span>
                  {statusCounts[option] !== undefined && (
                    <span className="ml-2 text-xs text-slate-500">
                      ({statusCounts[option]})
                    </span>
                  )}
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(sortOptions).map(([value, label], index) => (
              <React.Fragment key={value}>
                {/* Add separator before "most-applicants" */}
                {value === "most-applicants" && <DropdownMenuSeparator />}
                <DropdownMenuItem onClick={() => onSortChange(value)}>
                  {label}
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
