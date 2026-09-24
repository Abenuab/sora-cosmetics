"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#292725] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link href="/" className="inline-block">
              <h2 className="font-serif text-4xl font-semibold italic tracking-tight text-white">
                Sora Cosmetics
              </h2>
            </Link>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#d1aaa1]">
              Beauty • Skincare • You
            </p>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#c8c1bc]">
              Discover carefully selected skincare, makeup and beauty
              essentials designed to make your everyday beauty routine
              feel a little more special.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#514b47] bg-[#34312f] text-lg transition duration-300 hover:-translate-y-1 hover:border-[#b98b80] hover:bg-[#b98b80]"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#514b47] bg-[#34312f] text-sm font-bold transition duration-300 hover:-translate-y-1 hover:border-[#b98b80] hover:bg-[#b98b80]"
              >
                f
              </a>

              <a
                href="mailto:info@soracosmetics.com"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#514b47] bg-[#34312f] text-lg transition duration-300 hover:-translate-y-1 hover:border-[#b98b80] hover:bg-[#b98b80]"
              >
                @
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d1aaa1]">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  href="/"
                  className="text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  href="/my-orders"
                  className="text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d1aaa1]">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#817a75]">
                  Phone
                </p>

                <a
                  href="tel:+251996012811"
                  className="mt-1 block text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  +251 996 012 811
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#817a75]">
                  Email
                </p>

                <a
                  href="mailto:info@soracosmetics.com"
                  className="mt-1 block break-all text-sm text-[#c8c1bc] transition hover:text-white"
                >
                  info@soracosmetics.com
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#817a75]">
                  Location
                </p>

                <p className="mt-1 text-sm text-[#c8c1bc]">
                  Ethiopia
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-[#403c39]" />

      {/* Bottom Footer */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 text-center sm:flex-row sm:text-left">

        <p className="text-xs text-[#817a75]">
          © {new Date().getFullYear()} Sora Cosmetics. All rights reserved.
        </p>

        <p className="text-xs text-[#817a75]">
          Made with <span className="text-[#d1aaa1]">♥</span> for beauty.
        </p>

      </div>

    </footer>
  );
}