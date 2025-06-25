"use client";
import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";

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

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => {
        // Add department and rating to each user
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

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onView={() => alert(`View ${user.firstName}`)}
          onBookmark={() => handleBookmark(user.id)}
          onPromote={() => alert(`Promote ${user.firstName}`)}
          isBookmarked={bookmarks.includes(user.id)}
        />
      ))}
    </main>
  );
}