"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const departments = ["HR", "Engineering", "Sales", "Marketing", "Finance"];

function getRandomHistory() {
  return Array.from({ length: 5 }, (_, i) => ({
    year: 2019 + i,
    rating: Math.floor(Math.random() * 5) + 1,
    project: `Project ${String.fromCharCode(65 + i)}`,
  }));
}

function getRandomBio() {
  return "Passionate and dedicated team member with a proven track record in multiple departments. Always striving for excellence and growth.";
}

function getBadgeColor(rating: number) {
  if (rating >= 4) return "bg-green-500";
  if (rating === 3) return "bg-yellow-500";
  return "bg-red-500";
}

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<"overview" | "projects" | "feedback">("overview");

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          ...data,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: Math.floor(Math.random() * 5) + 1,
          bio: getRandomBio(),
          history: getRandomHistory(),
        });
      });
  }, [id]);

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-gray-500">{user.email}</span>
          <span className="text-gray-500">{user.phone}</span>
          <span className="text-gray-500">{user.department}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          {[1,2,3,4,5].map((star) => (
            <span key={star} className={star <= user.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
          <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${getBadgeColor(user.rating)}`}>
            {user.rating} / 5
          </span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Address:</span> {user.address?.address}, {user.address?.city}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Bio:</span> {user.bio}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["overview", "projects", "feedback"].map((t) => (
          <button
            key={t}
            className={`btn ${tab === t ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab(t as any)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        {tab === "overview" && (
          <div>
            <h3 className="font-bold mb-2">Performance History</h3>
            <ul>
              {user.history.map((h: any) => (
                <li key={h.year} className="flex items-center gap-2 mb-1">
                  <span>{h.year}:</span>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={star <= h.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                  ))}
                  <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${getBadgeColor(h.rating)}`}>
                    {h.rating} / 5
                  </span>
                  <span className="ml-2 text-gray-500">{h.project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === "projects" && (
          <div>
            <h3 className="font-bold mb-2">Projects</h3>
            <ul>
              {user.history.map((h: any) => (
                <li key={h.project}>{h.project} ({h.year})</li>
              ))}
            </ul>
          </div>
        )}
        {tab === "feedback" && (
          <div>
            <h3 className="font-bold mb-2">Feedback</h3>
            <form className="flex flex-col gap-2">
              <textarea className="border rounded p-2" placeholder="Write feedback..." />
              <button className="btn btn-primary w-fit" type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}