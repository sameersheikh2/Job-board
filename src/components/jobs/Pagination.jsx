// src/components/jobs/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let previous = null;

    for (let i = 1; i <= totalPages; i += 1) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((page) => {
      if (previous) {
        if (page - previous === 2) {
          rangeWithDots.push(previous + 1);
        } else if (page - previous !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(page);
      previous = page;
    });

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="mt-12 flex justify-center" aria-label="Pagination">
      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
        </li>

        {visiblePages.map((page, index) =>
          page === "..." ? (
            <li key={index}>
              <span className="px-4 py-2 text-sm text-slate-500">...</span>
            </li>
          ) : (
            <li key={index}>
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  page === currentPage
                    ? "bg-[#0f172a] text-white border-[#0f172a]"
                    : "border border-slate-300 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
