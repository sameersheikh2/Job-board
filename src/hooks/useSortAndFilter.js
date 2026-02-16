// src/hooks/useSortAndFilter.js
import { useState, useMemo } from "react";

/**
 * Custom hook for managing sort and filter state
 * @param {Array} items - Items to sort and filter
 * @param {Function} sortFn - Sorting function (items, sortBy) => sortedItems
 * @param {Function} filterFn - Filtering function (items, filterBy) => filteredItems
 * @param {String} defaultSort - Default sort option
 * @param {String} defaultFilter - Default filter option
 */
export const useSortAndFilter = (
  items = [],
  sortFn,
  filterFn,
  defaultSort = "newest",
  defaultFilter = "all",
) => {
  const [sortBy, setSortBy] = useState(defaultSort);
  const [filterBy, setFilterBy] = useState(defaultFilter);

  // Filter first, then sort
  const result = useMemo(() => {
    const filtered = filterFn(items, filterBy);
    const sorted = sortFn(filtered, sortBy);
    return sorted;
  }, [items, sortBy, filterBy, sortFn, filterFn]);

  return {
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    result,
  };
};
