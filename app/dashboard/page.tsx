"use client";

import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };
  return (
    <div>
      <h2>Dashboard Page</h2>
      <button
        className="bg-orange-500 text-white rounded-xl px-4 py-2 hover:bg-orange-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
