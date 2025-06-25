import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Optional: install @heroicons/react

type Props = {
  search: string;
  setSearch: (v: string) => void;
  departments: string[];
  selectedDepartments: string[];
  setSelectedDepartments: (v: string[]) => void;
  ratings: number[];
  selectedRatings: number[];
  setSelectedRatings: (v: number[]) => void;
};

export default function SearchFilterBar({
  search,
  setSearch,
  departments,
  selectedDepartments,
  setSelectedDepartments,
  ratings,
  selectedRatings,
  setSelectedRatings,
}: Props) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 flex flex-col md:flex-row md:items-end gap-4 mb-6 border">
      {/* Search */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <div className="relative">
          <input
            className="border rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name, email, or department"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Icon */}
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      {/* Department Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Departments
        </label>
        <select
          multiple
          className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900"
          value={selectedDepartments}
          onChange={(e) =>
            setSelectedDepartments(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ratings
        </label>
        <select
          multiple
          className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900"
          value={selectedRatings.map(String)}
          onChange={(e) =>
            setSelectedRatings(
              Array.from(e.target.selectedOptions, (opt) => Number(opt.value))
            )
          }
        >
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}