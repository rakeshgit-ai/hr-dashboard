import React from "react";

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
  // Toggle selection for multi-select
  const toggle = (arr: any[], value: any) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        className="border rounded px-2 py-1 w-full md:w-1/3"
        placeholder="Search by name, email, or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2">
        <select
          multiple
          className="border rounded px-2 py-1"
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
        <select
          multiple
          className="border rounded px-2 py-1"
          value={selectedRatings.map(String)}
          onChange={(e) =>
            setSelectedRatings(
              Array.from(e.target.selectedOptions, (opt) => Number(opt.value))
            )
          }
        >
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r}★
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}