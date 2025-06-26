"use client";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

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

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks } = useBookmarkStore();
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

  // Department-wise average ratings
  const deptAverages = departments.map((dept) => {
    const deptUsers = users.filter((u) => u.department === dept);
    const avg =
      deptUsers.length > 0
        ? deptUsers.reduce((sum, u) => sum + u.rating, 0) / deptUsers.length
        : 0;
    return Number(avg.toFixed(2));
  });

  // Mocked bookmark trends (for demo)
  const bookmarkTrends = Array.from({ length: 7 }, (_, i) => Math.floor(Math.random() * bookmarks.length + 1));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">📊 Analytics</h1>
      {loading && (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></span>
          Loading analytics...
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center my-4">
          Error: {error}
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Department-wise Average Ratings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Department-wise Average Ratings</h2>
            <Bar
              data={{
                labels: departments,
                datasets: [
                  {
                    label: "Average Rating",
                    data: deptAverages,
                    backgroundColor: "rgba(59, 130, 246, 0.7)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { min: 0, max: 5, ticks: { stepSize: 1 } },
                },
              }}
            />
          </div>
          {/* Bookmark Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Bookmark Trends (Mocked)</h2>
            <Line
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    label: "Bookmarks",
                    data: bookmarkTrends,
                    borderColor: "rgba(16, 185, 129, 1)",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    tension: 0.4,
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}