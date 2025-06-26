"use client";
import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import SearchFilterBar from "@/components/SearchFilterBar";
import { useRouter } from "next/navigation";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useSearchFilterStore } from "@/store/searchFilterStore";
import { useAuthStore } from "@/store/authStore";
import CreateUserModal from "@/components/CreateUserModal";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
};

const departments = ["HR", "Engineering", "Sales", "Marketing", "Finance"];
const ratings = [1, 2, 3, 4, 5];

function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export default function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);

  // Zustand bookmark store
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

  // Zustand search/filter store
  const {
    search,
    setSearch,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    resetFilters,
  } = useSearchFilterStore();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        const usersWithExtras = data.users.map((u: any) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          age: u.age,
          department: getRandomDepartment(),
          rating: getRandomRating(),
        }));
        setUsers(usersWithExtras);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.department);
    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(user.rating);
    return matchesSearch && matchesDept && matchesRating;
  });

  return (
    <div className="p-4">
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        departments={departments}
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
        ratings={ratings}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
      />
      <button className="btn btn-primary" onClick={() => setShowCreateUser(true)}>
        + Create User
      </button>
      <CreateUserModal
        open={showCreateUser}
        onClose={() => setShowCreateUser(false)}
        onCreate={user => setUsers(prev => [
          ...prev,
          { ...user, id: prev.length + 100, age: 18 } // <-- add age here
        ])}
        departments={departments}
      />
      {loading && (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></span>
          Loading users...
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center my-4">
          Error: {error}
        </div>
      )}
      {!loading && !error && (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onView={() => router.push(`/employee/${user.id}`)}
              onBookmark={() =>
                isBookmarked(user.id)
                  ? removeBookmark(user.id)
                  : addBookmark(user.id)
              }
              onPromote={() => alert(`Promote ${user.firstName}`)}
              isBookmarked={isBookmarked(user.id)}
            />
          ))}
        </main>
      )}

    </div>
  );
}