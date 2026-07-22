"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  async function logout() {
    await supabase.auth.signOut();
    alert("Logged out successfully");
  }

  return (
    <nav className="flex justify-between items-center p-6 bg-white dark:bg-gray-950 shadow">

      <Link
        href="/"
        className="text-3xl font-bold text-pink-600"
      >
        Sora Cosmetics ✨
      </Link>

      <div className="flex items-center gap-6">

        <Link href="/">Home</Link>

        <Link href="/products">Products</Link>

        <Link
          href="/cart"
          className="relative"
        >
          Cart 🛒

          {cartCount > 0 && (
            <span className="absolute -top-3 -right-4 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <Link href="/contact">Contact</Link>

        {!user ? (
          <>
            <Link href="/login">Login</Link>

            <Link href="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-500">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}