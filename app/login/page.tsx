"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      console.error("LOGIN ERROR:", error);

      setErrorMessage(error.message);
      return;
    }

    console.log("LOGIN SUCCESS:", data.user);

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-20 text-[#292725]">

      <div className="mx-auto max-w-md">

        {/* Header */}

        <div className="mb-10 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b98b80]">
            Sora Cosmetics
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm text-[#77716c]">
            Login to your Sora Cosmetics account.
          </p>

        </div>

        {/* Login Card */}

        <div className="rounded-[28px] border border-[#e5e0db] bg-white p-7 shadow-[0_15px_45px_rgba(40,35,30,0.08)] sm:p-9">

          {/* Error */}

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Email */}

          <div className="mb-5">

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#292725]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-[#ded9d4]
                bg-[#fffdfb]
                px-4
                py-3.5
                text-[#292725]
                outline-none
                transition
                placeholder:text-[#aaa39d]
                focus:border-[#b98b80]
                focus:ring-2
                focus:ring-[#b98b80]/20
              "
            />

          </div>

          {/* Password */}

          <div className="mb-6">

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#292725]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
              className="
                w-full
                rounded-xl
                border
                border-[#ded9d4]
                bg-[#fffdfb]
                px-4
                py-3.5
                text-[#292725]
                outline-none
                transition
                placeholder:text-[#aaa39d]
                focus:border-[#b98b80]
                focus:ring-2
                focus:ring-[#b98b80]/20
              "
            />

          </div>

          {/* Login Button */}

          <button
            onClick={login}
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-[#292725]
              py-3.5
              font-semibold
              text-white
              transition
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#b98b80]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}

          <p className="mt-7 text-center text-sm text-[#77716c]">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-semibold text-[#a4766b] transition hover:text-[#80564d] hover:underline"
            >
              Create an account
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}