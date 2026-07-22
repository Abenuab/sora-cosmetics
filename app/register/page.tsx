"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");
    router.push("/login");
  };

  return (
    <main className="max-w-md mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">
        Register
      </h1>

      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-3 rounded mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={register}
        disabled={loading}
        className="w-full bg-pink-600 text-white p-3 rounded-xl"
      >
        {loading ? "Creating..." : "Register"}
      </button>
    </main>
  );
}