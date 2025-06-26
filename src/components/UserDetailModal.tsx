import React, { useState } from "react";
import { useUserDetailStore } from "@/store/userDetailStore";
import type { User } from "@/types/User";

type Props = {
  open: boolean;
  onClose: () => void;
  user?: User | null;
};

export default function UserDetailModal({ open, onClose, user }: Props) {
  const [tab, setTab] = useState<"overview" | "project" | "feedback">("overview");
  const {
    overview,
    project,
    feedback,
    setOverview,
    setProject,
    setFeedback,
    reset,
  } = useUserDetailStore();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Saved!");
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {user ? `${user.firstName} ${user.lastName}` : "User Details"}
        </h2>
        <div className="flex gap-2 mb-4">
          <button
            className={`btn ${tab === "overview" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            className={`btn ${tab === "project" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("project")}
          >
            Projects
          </button>
          <button
            className={`btn ${tab === "feedback" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("feedback")}
          >
            Feedback
          </button>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {tab === "overview" && (
            <textarea
              className="border rounded p-2"
              placeholder="Add Overview"
              value={overview}
              onChange={e => setOverview(e.target.value)}
            />
          )}
          {tab === "project" && (
            <input
              className="border rounded p-2"
              placeholder="Add Project Details"
              value={project}
              onChange={e => setProject(e.target.value)}
            />
          )}
          {tab === "feedback" && (
            <textarea
              className="border rounded p-2"
              placeholder="Submit Feedback"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          )}
          <div className="flex gap-2 justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}