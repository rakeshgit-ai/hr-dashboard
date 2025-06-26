"use client";
import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

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

function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export default function BookmarksPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks, removeBookmark, isBookmarked } = useBookmarkStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

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

  // UI actions
  const handlePromote = (user: User) => {
    alert(`Promote ${user.firstName}`);
  };
  const handleAssign = (user: User) => {
    alert(`Assign ${user.firstName} to project`);
  };

  const bookmarkedUsers = users.filter((u) => isBookmarked(u.id));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
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
        <>
          {bookmarkedUsers.length === 0 ? (
            <p>No bookmarks yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bookmarkedUsers.map((user) => (
                <div key={user.id} className="relative">
                  <UserCard
                    user={user}
                    onView={() => window.location.href = `/employee/${user.id}`}
                    onBookmark={() => removeBookmark(user.id)}
                    onPromote={() => handlePromote(user)}
                    isBookmarked={true}
                    bookmarkLabel="Remove Bookmark"
                  />
                  <button
                    className="btn btn-outline mt-2 w-full"
                    onClick={() => handleAssign(user)}
                  >
                    Assign to Project
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}