"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  async function logout() {
    await supabase.auth.signOut();

    setMenuOpen(false);

    alert("Logged out successfully");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e8e3df] bg-white/95 backdrop-blur-md">

      {/* ========================================
          MAIN NAVBAR
      ======================================== */}

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">

        {/* ========================================
            LOGO
        ======================================== */}

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group"
        >
          <div
            className="
              sora-logo
              text-3xl
              text-[#1f1f1f]
              transition
              duration-300
              group-hover:text-[#8b6f61]
              md:text-4xl
            "
          >
            Sora Cosmetics
          </div>

          <div
            className="
              mt-1
              font-[var(--font-manrope)]
              text-[9px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-[#9a8c84]
            "
          >
            Beauty • Skincare • You
          </div>
        </Link>

        {/* ========================================
            DESKTOP NAVIGATION
        ======================================== */}

        <div
          className="
            sora-nav
            hidden
            items-center
            gap-7
            md:flex
          "
        >

          {/* HOME */}

          <Link
            href="/"
            className="sora-nav-link"
          >
            Home
          </Link>

          {/* PRODUCTS */}

          <Link
            href="/products"
            className="sora-nav-link"
          >
            Products
          </Link>

          {/* MY ORDERS */}

          <Link
            href="/my-orders"
            className="sora-nav-link"
          >
            My Orders
          </Link>

          {/* CONTACT */}

          <Link
            href="/contact"
            className="sora-nav-link"
          >
            Contact
          </Link>

          {/* ========================================
              CART
          ======================================== */}

          <Link
            href="/cart"
            className="
              sora-nav-link
              group
              relative
              flex
              items-center
              gap-2
            "
          >
            <span>
              Cart
            </span>

            <span
              className="
                text-base
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              🛒
            </span>

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-3
                  -top-3
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1f1f1f]
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* ========================================
              AUTH
          ======================================== */}

          {!user ? (
            <>
              {/* LOGIN */}

              <Link
                href="/login"
                className="sora-nav-link"
              >
                Login
              </Link>

              {/* REGISTER */}

              <Link
                href="/register"
                className="
                  rounded-full
                  border
                  border-[#1f1f1f]
                  px-5
                  py-2.5
                  font-[var(--font-manrope)]
                  text-sm
                  font-medium
                  tracking-wide
                  text-[#1f1f1f]
                  transition
                  duration-300
                  hover:bg-[#1f1f1f]
                  hover:text-white
                "
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* USER EMAIL */}

              <span
                className="
                  max-w-[180px]
                  truncate
                  font-[var(--font-manrope)]
                  text-xs
                  text-[#8b817b]
                "
                title={user.email ?? ""}
              >
                {user.email}
              </span>

              {/* LOGOUT */}

              <button
                onClick={logout}
                className="
                  rounded-full
                  bg-[#1f1f1f]
                  px-5
                  py-2.5
                  font-[var(--font-manrope)]
                  text-sm
                  font-medium
                  tracking-wide
                  text-white
                  transition
                  duration-300
                  hover:bg-[#8b6f61]
                "
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ========================================
            MOBILE MENU BUTTON
        ======================================== */}

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#e8e1dc]
            text-[#333]
            transition
            duration-300
            hover:bg-[#f8f5f2]
            md:hidden
          "
        >
          <div className="flex flex-col gap-1.5">

            <span
              className={`
                block
                h-[1.5px]
                w-5
                bg-[#333]
                transition
                duration-300
                ${
                  menuOpen
                    ? "translate-y-2 rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                h-[1.5px]
                w-5
                bg-[#333]
                transition
                duration-300
                ${
                  menuOpen
                    ? "opacity-0"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                h-[1.5px]
                w-5
                bg-[#333]
                transition
                duration-300
                ${
                  menuOpen
                    ? "-translate-y-1.5 -rotate-45"
                    : ""
                }
              `}
            />

          </div>
        </button>

      </div>

      {/* ========================================
          MOBILE MENU
      ======================================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-[#eee8e3]
          bg-[#fffdfb]
          transition-all
          duration-300
          md:hidden
          ${
            menuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            px-6
            py-5
          "
        >

          {/* HOME */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="
              sora-nav-link
              border-b
              border-[#eee8e3]
              py-4
            "
          >
            Home
          </Link>

          {/* PRODUCTS */}

          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="
              sora-nav-link
              border-b
              border-[#eee8e3]
              py-4
            "
          >
            Products
          </Link>

          {/* MY ORDERS */}

          <Link
            href="/my-orders"
            onClick={() => setMenuOpen(false)}
            className="
              sora-nav-link
              border-b
              border-[#eee8e3]
              py-4
            "
          >
            My Orders
          </Link>

          {/* CONTACT */}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="
              sora-nav-link
              border-b
              border-[#eee8e3]
              py-4
            "
          >
            Contact
          </Link>

          {/* CART */}

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="
              sora-nav-link
              flex
              items-center
              justify-between
              border-b
              border-[#eee8e3]
              py-4
            "
          >
            <span>
              Cart 🛒
            </span>

            {cartCount > 0 && (
              <span
                className="
                  flex
                  h-6
                  min-w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1f1f1f]
                  px-2
                  text-xs
                  font-bold
                  text-white
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* ========================================
              MOBILE AUTH
          ======================================== */}

          {!user ? (
            <div
              className="
                flex
                flex-col
                gap-3
                pt-5
              "
            >

              {/* LOGIN */}

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  rounded-full
                  border
                  border-[#dcd3ce]
                  py-3
                  text-center
                  font-[var(--font-manrope)]
                  text-sm
                  font-medium
                  text-[#333]
                  transition
                  hover:bg-[#f8f5f2]
                "
              >
                Login
              </Link>

              {/* REGISTER */}

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="
                  rounded-full
                  bg-[#1f1f1f]
                  py-3
                  text-center
                  font-[var(--font-manrope)]
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#8b6f61]
                "
              >
                Register
              </Link>

            </div>
          ) : (
            <div className="pt-5">

              {/* USER */}

              <p
                className="
                  mb-3
                  truncate
                  font-[var(--font-manrope)]
                  text-xs
                  text-[#8b817b]
                "
              >
                {user.email}
              </p>

              {/* LOGOUT */}

              <button
                onClick={logout}
                className="
                  w-full
                  rounded-full
                  bg-[#1f1f1f]
                  py-3
                  font-[var(--font-manrope)]
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#8b6f61]
                "
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}