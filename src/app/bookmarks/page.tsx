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

export default function BookmarksPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [bookmarks, setBookmarks] = useState<number[]>([]);

    // Load bookmarks from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("bookmarks");
        if (saved) setBookmarks(JSON.parse(saved));
    }, []);

    // Fetch all users and filter by bookmarks
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

    // Remove bookmark
    const handleRemove = (id: number) => {
        const updated = bookmarks.filter((bid) => bid !== id);
        setBookmarks(updated);
        localStorage.setItem("bookmarks", JSON.stringify(updated));
    };

    // UI actions
    const handlePromote = (user: User) => {
        alert(`Promote ${user.firstName}`);
    };
    const handleAssign = (user: User) => {
        alert(`Assign ${user.firstName} to project`);
    };

    const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
            {bookmarkedUsers.length === 0 ? (
                <p>No bookmarks yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {bookmarkedUsers.map((user) => (
                        <div key={user.id} className="relative">
                            <UserCard
                                user={user}
                                onView={() => window.location.href = `/employee/${user.id}`}
                                onBookmark={() => handleRemove(user.id)}
                                onPromote={() => handlePromote(user)}
                                isBookmarked={true}
                                bookmarkLabel="Remove Bookmark" // <-- Add this line
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
        </div>
    );
}