import React, { useState } from "react";

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (user: {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    rating: number;
  }) => void;
  departments: string[];
};

export default function CreateUserModal({
  open,
  onClose,
  onCreate,
  departments,
}: CreateUserModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: departments[0] || "",
    rating: 3,
  });
  const [error, setError] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            if (!form.firstName || !form.lastName || !form.email) {
              setError("All fields are required.");
              return;
            }
            setError("");
            onCreate(form);
            setForm({
              firstName: "",
              lastName: "",
              email: "",
              department: departments[0] || "",
              rating: 3,
            });
            onClose();
          }}
        >
          <input
            className="border rounded p-2"
            placeholder="First Name"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <input
            className="border rounded p-2"
            placeholder="Last Name"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            required
          />
          <input
            className="border rounded p-2"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <select
            className="border rounded p-2"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          >
            {departments.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <select
            className="border rounded p-2"
            value={form.rating}
            onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
          >
            {[1,2,3,4,5].map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
          {error && <span className="text-red-500">{error}</span>}
          <div className="flex gap-2 justify-end">
            <button className="btn btn-primary" type="submit">Create</button>
            <button className="btn btn-outline" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}