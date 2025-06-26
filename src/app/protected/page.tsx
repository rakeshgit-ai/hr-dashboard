"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SomeProtectedPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setCheckedAuth(true);
    }
  }, [isAuthenticated, router]);

  if (!checkedAuth) return null;

  return (
    <div>
      {/* ...rest of your page... */}
      <h1>Protected Content</h1>
    </div>
  );
}