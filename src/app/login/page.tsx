"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup" | "forgot">("login");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", password: "", confirm: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginForm.username, loginForm.password)) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          {/* Logo or App Name */}
          <div className="mb-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">HR Dashboard</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                tab === "login"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                tab === "signup"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                tab === "forgot"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setTab("forgot")}
            >
              Forgot Password
            </button>
          </div>
        </div>

        {tab === "login" && (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <h2 className="text-xl font-semibold mb-2 text-center">Welcome Back</h2>
            {/* Highlighted credentials box */}
            <div className="bg-blue-50 border border-blue-400 text-blue-700 rounded p-3 mb-2 text-center flex flex-col items-center">
              <span className="font-semibold flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                Demo Credentials
              </span>
              <span>
                <b>User:</b> <span className="font-mono bg-white px-2 py-1 ">admin</span>
              </span>
              <span>
                <b>Password:</b> <span className="font-mono bg-white px-2 py-1 ">admin</span>
              </span>
            </div>
            <input
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={loginForm.username}
              onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
              autoFocus
            />
            <input
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button className="btn btn-primary w-full mt-2" type="submit">
              Login
            </button>
            
          </form>
        )}

        {tab === "signup" && (
          <form className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2 text-center">Create Account</h2>
            <input
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={signupForm.username}
              onChange={e => setSignupForm(f => ({ ...f, username: e.target.value }))}
            />
            <input
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
            />
            <input
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Confirm Password"
              value={signupForm.confirm}
              onChange={e => setSignupForm(f => ({ ...f, confirm: e.target.value }))}
            />
            <button className="btn btn-primary w-full mt-2" type="button" disabled>
              Sign Up (Coming Soon)
            </button>
          </form>
        )}

        {tab === "forgot" && (
          <form className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2 text-center">Reset Password</h2>
            <input
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
            />
            <button className="btn btn-primary w-full mt-2" type="button" disabled>
              Send Reset Link (Coming Soon)
            </button>
          </form>
        )}
      </div>
    </div>
  );
}