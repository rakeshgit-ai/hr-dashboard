"use client";
import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import SearchFilterBar from "@/components/SearchFilterBar";
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
const ratings = [1, 2, 3, 4, 5];

function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const router = useRouter();

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
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
      });
  }, []);

  const handleBookmark = (id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

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
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={() => router.push(`/employee/${user.id}`)}
            onBookmark={() => handleBookmark(user.id)}
            onPromote={() => alert(`Promote ${user.firstName}`)}
            isBookmarked={bookmarks.includes(user.id)}
          />
        ))}
      </main>
    </div>
  );
}