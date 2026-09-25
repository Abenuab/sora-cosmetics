"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setGoogleLoading(false);
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5efe9] px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
        
        <h1 className="text-center font-serif text-4xl font-semibold text-[#292725]">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-sm text-[#8b6f61]">
          Login to your Sora Cosmetics account
        </p>

        {/* Email */}
        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-[#292725]">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#ddd3cc] px-4 py-3 outline-none transition focus:border-[#b98b80]"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-[#292725]">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#ddd3cc] px-4 py-3 outline-none transition focus:border-[#b98b80]"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#292725] py-3 font-medium text-white transition hover:bg-[#b98b80] disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#ddd3cc]" />
          <span className="text-xs text-[#8b6f61]">OR</span>
          <div className="h-px flex-1 bg-[#ddd3cc]" />
        </div>

        {/* Google Button */}
        <button
          onClick={loginWithGoogle}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#ddd3cc] bg-white py-3 font-medium text-[#292725] transition hover:bg-[#f5efe9] disabled:opacity-60"
        >
          <span className="text-xl font-bold">G</span>

          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-[#8b6f61]">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-[#292725] hover:text-[#b98b80]"
          >
            Create account
          </a>
        </p>
      </div>
    </main>
  );
}