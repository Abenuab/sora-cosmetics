"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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
      console.error(error);
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

    console.log("NEW PRODUCTS:", data);

    if (!error && data) {
      setNewProducts(data);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#211d1b]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#211d1b] text-white">

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#b98579]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#d8b7a8]/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold tracking-wide text-[#f2d9ce] backdrop-blur-md">
              ✨ PREMIUM BEAUTY COLLECTION
            </div>

            <h1
              className={`${montserrat.className} text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl`}
            >
              Reveal Your

              <span className="mt-2 block text-[#d9a99b]">
                Natural Beauty
              </span>

              <span className="mt-2 block text-white">
                With Sora
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#d5ccc7] sm:text-xl">
              Premium skincare and cosmetics created to enhance your
              confidence, beauty and everyday self-care routine.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="rounded-full bg-[#c58f82] px-8 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#b77e70]"
              >
                Shop Collection →
              </Link>

              <Link
                href="/cart"
                className="rounded-full border border-white/40 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur transition duration-300 hover:bg-white hover:text-[#211d1b]"
              >
                View Cart 🛒
              </Link>

            </div>

            {/* Stats */}

            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">

              <div>
                <h3 className="text-3xl font-extrabold text-[#d9a99b]">
                  100+
                </h3>
                <p className="mt-1 text-sm text-[#bdb3ae]">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-extrabold text-[#d9a99b]">
                  50+
                </h3>
                <p className="mt-1 text-sm text-[#bdb3ae]">
                  Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-extrabold text-[#d9a99b]">
                  5★
                </h3>
                <p className="mt-1 text-sm text-[#bdb3ae]">
                  Reviews
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="relative flex justify-center lg:justify-end">

            <div className="absolute h-[420px] w-[420px] rounded-full bg-[#c58f82]/20 blur-3xl" />

            <div className="relative w-full max-w-[520px] rounded-[40px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">

              <Image
                src="/images/cream.jpg"
                alt="Sora Cosmetics"
                width={550}
                height={650}
                priority
                className="h-[520px] w-full rounded-[32px] object-cover"
              />

              {/* Floating badge */}

              <div className="absolute bottom-8 left-8 rounded-2xl border border-white/20 bg-[#211d1b]/85 px-5 py-4 shadow-xl backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9bbb5]">
                  Sora Cosmetics
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                  Beauty, Naturally.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="bg-[#f5efe9] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#a4776b]">
                Sora Selection
              </p>

              <h2 className="text-4xl font-bold text-[#211d1b] sm:text-5xl">
                Featured Products
              </h2>

              <p className="mt-4 max-w-xl text-lg text-[#665d58]">
                Discover some of our most loved beauty products, carefully
                selected for your everyday beauty routine.
              </p>

            </div>

            <Link
              href="/products"
              className="font-bold text-[#9b685c] transition hover:text-[#6f473f]"
            >
              View All Products →
            </Link>

          </div>


          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-[#e3d8d1] bg-[#fffaf7] shadow-[0_10px_35px_rgba(70,50,40,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(70,50,40,0.15)]"
              >

                <div className="overflow-hidden bg-[#eee3dc]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="p-6">

                  {product.category && (
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a4776b]">
                      {product.category}
                    </p>
                  )}

                  <h3 className="mt-2 text-xl font-bold text-[#211d1b]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-xl font-bold text-[#9b685c]">
                    ETB {Number(product.price).toFixed(2)}
                  </p>

                  <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        price: Number(product.price),
                        quantity: 1,
                      })
                    }
                    className="mt-5 w-full rounded-xl bg-[#211d1b] py-3 font-semibold text-white transition hover:bg-[#9b685c]"
                  >
                    Add To Cart 🛒
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

      <section className="bg-[#e9ddd5] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#95665b]">
              Just In
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#211d1b] sm:text-5xl">
              New Arrivals ✨
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-[#665d58]">
              Explore the latest products added to Sora Cosmetics.
            </p>

          </div>


          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {newProducts.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-[#d7c8c0] bg-[#fffaf7] shadow-lg transition duration-300 hover:-translate-y-2"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#211d1b] px-4 py-2 text-xs font-bold tracking-wider text-white">
                    NEW
                  </span>

                </div>

                <div className="p-6">

                  {product.category && (
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a4776b]">
                      {product.category}
                    </p>
                  )}

                  <h3 className="mt-2 text-xl font-bold text-[#211d1b]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-xl font-bold text-[#9b685c]">
                    ETB {Number(product.price).toFixed(2)}
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

      <section className="bg-[#211d1b] px-6 py-24 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d1a397]">
              Our World
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Beauty Gallery 📸
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[#c5bbb6]">
              A glimpse into the beauty and elegance behind Sora Cosmetics.
            </p>

          </div>


          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">

            {[
              "/images/2.jpg",
              "/images/3.jpg",
              "/images/4.jpg",
              "/images/cream.jpg",
            ].map((img) => (

              <div
                key={img}
                className="group overflow-hidden rounded-[28px] border border-white/10 shadow-xl"
              >

                <img
                  src={img}
                  alt="Sora Beauty"
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY SORA
      ===================================================== */}

      <section className="bg-[#f5efe9] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a4776b]">
              The Sora Difference
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#211d1b] sm:text-5xl">
              Why Choose Sora?
            </h2>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["🚚", "Fast Delivery", "Quick and reliable delivery"],
              ["🔒", "Secure Payment", "Safe Chapa checkout"],
              ["🌿", "Premium Quality", "Carefully selected products"],
              ["⭐", "Trusted Brand", "Customer satisfaction"],
            ].map((item) => (

              <div
                key={item[1]}
                className="rounded-[28px] border border-[#e0d3cb] bg-[#fffaf7] p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="text-5xl">
                  {item[0]}
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#211d1b]">
                  {item[1]}
                </h3>

                <p className="mt-3 text-[#6d625d]">
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

      <section className="bg-[#eee2da] px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a4776b]">
              Customer Stories
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#211d1b] sm:text-5xl">
              Customer Love 💖
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
                className="rounded-[28px] border border-[#dccbc2] bg-[#fffaf7] p-8 text-center shadow-sm"
              >

                <div className="mb-5 text-2xl text-[#b27c70]">
                  “
                </div>

                <p className="text-lg leading-8 text-[#403936]">
                  {review}
                </p>

                <div className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#9b685c]">
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

      <section className="bg-[#211d1b] px-6 py-24 text-white">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d1a397]">
            Stay Connected
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Stay Beautiful With Sora ✨
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-[#c8beb9]">
            Get updates about new products, beauty tips and special offers.
          </p>


          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">

            <input
              placeholder="Enter your email address"
              className="min-h-14 flex-1 rounded-xl border border-white/15 bg-white/10 px-5 text-white outline-none placeholder:text-[#a99f9a] focus:border-[#c58f82]"
            />

            <button
              className="min-h-14 rounded-xl bg-[#c58f82] px-8 font-bold text-white transition hover:bg-[#b77e70]"
            >
              Subscribe
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}