import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
  // Toggle logic for checkboxes
  const toggleDepartment = (dept: string) => {
    setSelectedDepartments(
      selectedDepartments.includes(dept)
        ? selectedDepartments.filter((d) => d !== dept)
        : [...selectedDepartments, dept]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating)
        ? selectedRatings.filter((r) => r !== rating)
        : [...selectedRatings, rating]
    );
  };

  return (
    <div className="sticky top-[64px] z-40 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 flex flex-col md:flex-row md:items-end gap-6 mb-6 border backdrop-blur">
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
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      {/* Department Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Departments
        </label>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <label key={dept} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDepartments.includes(dept)}
                onChange={() => toggleDepartment(dept)}
                className="accent-blue-500"
              />
              <span className="text-sm">{dept}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ratings
        </label>
        <div className="flex flex-wrap gap-2">
          {ratings.map((r) => (
            <label key={r} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRatings.includes(r)}
                onChange={() => toggleRating(r)}
                className="accent-yellow-400"
              />
              <span className="text-sm">
                {r}{" "}
                <span className="text-yellow-400">★</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}