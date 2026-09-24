"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

export default function Home() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
    loadNewProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .limit(4);

    if (error) {
      console.error("Featured products error:", error);
      return;
    }

    setProducts(data || []);
  }

  async function loadNewProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .limit(4);

    if (error) {
      console.error("New products error:", error);
      return;
    }

    setNewProducts(data || []);
  }

  const formatPrice = (price: number) =>
    `ETB ${Number(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <main className="min-h-screen bg-[#f4eee9] text-[#211817]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[92vh] overflow-hidden bg-[#211817] text-white">

        {/* Background decoration */}

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#b77b6f]/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#8f5960]/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5a79a]/5 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20">

          {/* LEFT CONTENT */}

          <div className="max-w-2xl">

            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d8afa3]/30 bg-[#d8afa3]/10 px-5 py-3 backdrop-blur-md">

              <span className="h-2 w-2 rounded-full bg-[#d9a99b]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e6c9bf]">
                Premium Beauty Collection
              </span>

            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-8xl">

              Reveal Your

              <span className="mt-3 block italic text-[#d9a99b]">
                Natural Beauty
              </span>

              <span className="mt-3 block text-white">
                With Sora
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#d6cbc6] sm:text-lg">
              Premium skincare and cosmetics carefully selected to enhance
              your confidence, beauty and everyday self-care routine.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c58f82] px-8 py-4 text-sm font-bold text-white shadow-[0_15px_40px_rgba(197,143,130,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#d09a8d]"
              >
                Shop Collection

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/cart"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white hover:text-[#211817]"
              >
                View Cart
                <span>🛒</span>
              </Link>

            </div>

            {/* Stats */}

            <div className="mt-14 grid max-w-xl grid-cols-3 border-t border-white/10 pt-8">

              <div>
                <p className="text-3xl font-semibold text-[#d9a99b]">
                  100+
                </p>

                <p className="mt-1 text-xs uppercase tracking-wider text-[#a99d98]">
                  Happy Clients
                </p>
              </div>

              <div className="border-l border-white/10 pl-6">
                <p className="text-3xl font-semibold text-[#d9a99b]">
                  50+
                </p>

                <p className="mt-1 text-xs uppercase tracking-wider text-[#a99d98]">
                  Products
                </p>
              </div>

              <div className="border-l border-white/10 pl-6">
                <p className="text-3xl font-semibold text-[#d9a99b]">
                  5★
                </p>

                <p className="mt-1 text-xs uppercase tracking-wider text-[#a99d98]">
                  Reviews
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="relative flex justify-center lg:justify-end">

            <div className="absolute h-[450px] w-[450px] rounded-full bg-[#c58f82]/20 blur-[100px]" />

            <div className="relative w-full max-w-[520px]">

              {/* Outer frame */}

              <div className="rounded-[42px] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">

                <div className="relative overflow-hidden rounded-[34px]">

                  <Image
                    src="/images/cream.jpg"
                    alt="Sora Cosmetics premium skincare"
                    width={600}
                    height={720}
                    priority
                    className="h-[500px] w-full object-cover sm:h-[600px]"
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#211817]/60 via-transparent to-transparent" />

                </div>

              </div>


              {/* Floating luxury card */}

              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/10 bg-[#2b1d1e]/95 px-6 py-5 shadow-2xl backdrop-blur-xl sm:left-5">

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#bcaea9]">
                  Sora Cosmetics
                </p>

                <p className="mt-2 font-[var(--font-heading)] text-2xl text-white">
                  Beauty, Naturally.
                </p>

              </div>


              {/* Small top badge */}

              <div className="absolute -right-3 top-8 hidden rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs font-semibold tracking-wider text-[#ead6cf] backdrop-blur-xl sm:block">
                BEAUTY • CARE • CONFIDENCE
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="bg-[#f4eee9] px-6 py-24 sm:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9b685c]">
                Sora Selection
              </p>

              <h2 className="mt-3 text-4xl font-semibold text-[#211817] sm:text-5xl">
                Featured Products
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#675d58]">
                Discover some of our most loved beauty products, carefully
                selected for your everyday beauty ritual.
              </p>

            </div>

            <Link
              href="/products"
              className="group inline-flex items-center gap-2 font-semibold text-[#8f5b50] transition hover:text-[#5f3d37]"
            >
              Explore Collection

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>


          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-[30px] border border-[#e2d5ce] bg-[#fffaf7] shadow-[0_12px_40px_rgba(60,40,30,0.07)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(60,40,30,0.14)]"
              >

                <div className="relative overflow-hidden bg-[#e9ddd6]">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

                </div>

                <div className="p-6">

                  {product.category && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a4776b]">
                      {product.category}
                    </p>
                  )}

                  <h3 className="mt-2 text-2xl font-semibold text-[#211817]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-lg font-bold text-[#965f54]">
                    {formatPrice(product.price)}
                  </p>

                  <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        price: Number(product.price),
                        quantity: 1,
                      })
                    }
                    className="mt-5 w-full rounded-xl bg-[#211817] py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#965f54]"
                  >
                    Add To Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEW ARRIVALS
      ===================================================== */}

      <section className="bg-[#2b1d1e] px-6 py-24 text-white sm:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d3a398]">
              Just In
            </p>

            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              New Arrivals
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#cbbebb]">
              Explore the latest products added to the Sora Cosmetics
              collection.
            </p>

          </div>


          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {newProducts.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#382729] shadow-xl transition duration-500 hover:-translate-y-2 hover:bg-[#402d30]"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#f4e5df] px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#2b1d1e]">
                    NEW
                  </span>

                </div>

                <div className="p-6">

                  {product.category && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a197]">
                      {product.category}
                    </p>
                  )}

                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-lg font-bold text-[#d7a69a]">
                    {formatPrice(product.price)}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BEAUTY GALLERY
      ===================================================== */}

      <section className="bg-[#eee3dc] px-6 py-24 sm:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#98685d]">
                Our World
              </p>

              <h2 className="mt-3 text-4xl font-semibold text-[#211817] sm:text-5xl">
                Beauty Gallery
              </h2>

            </div>

            <p className="max-w-xl text-base leading-7 text-[#655b56] lg:justify-self-end">
              A glimpse into the beauty, elegance and natural confidence
              behind Sora Cosmetics.
            </p>

          </div>


          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              "/images/2.jpg",
              "/images/3.jpg",
              "/images/4.jpg",
              "/images/cream.jpg",
            ].map((img, index) => (

              <div
                key={img}
                className={`group overflow-hidden rounded-[28px] border border-[#d9c9c0] shadow-lg ${
                  index === 0
                    ? "md:translate-y-8"
                    : index === 2
                      ? "md:-translate-y-5"
                      : ""
                }`}
              >

                <img
                  src={img}
                  alt={`Sora Beauty Gallery ${index + 1}`}
                  loading="lazy"
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-72"
                />

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY SORA
      ===================================================== */}

      <section className="bg-[#f4eee9] px-6 py-24 sm:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9b685c]">
              The Sora Difference
            </p>

            <h2 className="mt-3 text-4xl font-semibold text-[#211817] sm:text-5xl">
              Why Choose Sora?
            </h2>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["🚚", "Fast Delivery", "Quick and reliable delivery"],
              ["🔒", "Secure Payment", "Safe Chapa checkout"],
              ["🌿", "Premium Quality", "Carefully selected products"],
              ["⭐", "Trusted Brand", "Customer satisfaction"],
            ].map((item, index) => (

              <div
                key={item[1]}
                className={`rounded-[30px] border p-8 text-center shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  index === 1
                    ? "border-[#382729] bg-[#2b1d1e] text-white"
                    : index === 2
                      ? "border-[#d8bbb0] bg-[#ead8d0]"
                      : "border-[#e2d5ce] bg-[#fffaf7]"
                }`}
              >

                <div className="text-4xl">
                  {item[0]}
                </div>

                <h3
                  className={`mt-5 text-2xl font-semibold ${
                    index === 1 ? "text-white" : "text-[#211817]"
                  }`}
                >
                  {item[1]}
                </h3>

                <p
                  className={`mt-3 ${
                    index === 1 ? "text-[#cbbebb]" : "text-[#6b615c]"
                  }`}
                >
                  {item[2]}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="bg-[#211817] px-6 py-24 text-white sm:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d1a096]">
              Customer Stories
            </p>

            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Customer Love
            </h2>

          </div>


          <div className="mt-12 grid gap-7 md:grid-cols-3">

            {[
              "Beautiful products and amazing quality ⭐⭐⭐⭐⭐",
              "Fast delivery and excellent service ⭐⭐⭐⭐⭐",
              "My favorite cosmetics store ⭐⭐⭐⭐⭐",
            ].map((review) => (

              <div
                key={review}
                className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition duration-300 hover:bg-white/10"
              >

                <div className="mb-5 font-[var(--font-heading)] text-5xl text-[#d2a094]">
                  “
                </div>

                <p className="text-lg leading-8 text-[#e1d6d1]">
                  {review}
                </p>

                <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.25em] text-[#bfa49c]">
                  Verified Customer
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#8f5960] px-6 py-24 text-white sm:py-28">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f0dcd6]">
            Stay Connected
          </p>

          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Stay Beautiful With Sora
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#f1ded9]">
            Get updates about new products, beauty tips and special offers.
          </p>


          <div className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email address"
              className="min-h-14 flex-1 rounded-xl border border-white/20 bg-white/10 px-5 text-white outline-none backdrop-blur placeholder:text-[#e1c9c3] focus:border-white/50 focus:bg-white/15"
            />

            <button
              className="min-h-14 rounded-xl bg-[#211817] px-8 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#302021]"
            >
              Subscribe
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}