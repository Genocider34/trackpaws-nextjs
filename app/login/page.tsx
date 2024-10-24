"use client";

import { auth } from "@/app/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex min-h-screen flex-col items-center justify-center p-24 gap-4"
    >
      <h2 className="text-3xl font-bold">Login Page</h2>
      <input
        type="text"
        placeholder="Email Address"
        className="border-2 border-orange-500 rounded-xl px-4 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 border-orange-500 rounded-xl px-4 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Login" />
    </form>
  );
}
