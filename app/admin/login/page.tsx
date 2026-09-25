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

  // Email + Password Login
  const login = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

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

    alert("Login successful!");
    router.push("/");
    router.refresh();
  };

  // Google Login
  const loginWithGoogle = async () => {
    setGoogleLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setGoogleLoading(false);
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5efe9] px-6 py-16">

      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#a4776b]">
            Sora Cosmetics
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold italic text-[#292725]">
            Welcome Back
          </h1>

          <p className="mt-3 text-[#6f6a66]">
            Sign in to continue to your account.
          </p>

        </div>

        {/* Login Card */}
        <div className="rounded-[30px] border border-[#e1d7d0] bg-[#fffaf7] p-8 shadow-[0_15px_50px_rgba(50,40,35,0.08)]">

          {/* Google Button */}
          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#dcd4ce] bg-white py-3.5 font-semibold text-[#292725] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f8f5f2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="text-xl font-bold">G</span>

            {googleLoading
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-[#e3dcd6]" />

            <span className="text-xs font-semibold uppercase tracking-wider text-[#99908a]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#e3dcd6]" />

          </div>

          {/* Email */}
          <label className="mb-2 block text-sm font-semibold text-[#292725]">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-5 h-14 w-full rounded-xl border border-[#dcd4ce] bg-white px-4 text-[#292725] outline-none transition placeholder:text-[#aaa19b] focus:border-[#b98b80] focus:ring-2 focus:ring-[#b98b80]/20"
          />

          {/* Password */}
          <label className="mb-2 block text-sm font-semibold text-[#292725]">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
            className="mb-6 h-14 w-full rounded-xl border border-[#dcd4ce] bg-white px-4 text-[#292725] outline-none transition placeholder:text-[#aaa19b] focus:border-[#b98b80] focus:ring-2 focus:ring-[#b98b80]/20"
          />

          {/* Login Button */}
          <button
            type="button"
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-[#292725] py-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#a4776b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>

    </main>
  );
}