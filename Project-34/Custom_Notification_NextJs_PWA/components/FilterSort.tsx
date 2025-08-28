'use client';

import React from 'react';

export type FilterType = 'all' | 'active' | 'inactive' | 'favorites';
export type SortType = 'time-asc' | 'time-desc' | 'name-asc' | 'name-desc' | 'created-asc' | 'created-desc';

interface FilterSortProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  notificationCount: number;
}

export default function FilterSort({ filter, sort, onFilterChange, onSortChange, notificationCount }: FilterSortProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All ({notificationCount})</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="favorites">Favorites</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="time-asc">Time (earliest first)</option>
              <option value="time-desc">Time (latest first)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="created-asc">Created (oldest first)</option>
              <option value="created-desc">Created (newest first)</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {notificationCount} notification{notificationCount !== 1 ? 's' : ''} total
        </div>
      </div>
    </div>
  );
}