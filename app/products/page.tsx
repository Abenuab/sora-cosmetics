"use client";

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
  category: string;
};

export default function Products() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .limit(100);

    if (error) {
      console.error(error.message);
      return;
    }

    setProducts(data || []);
  }

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#292725]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#f3eee9] px-6 pb-20 pt-16 sm:pt-20">

        {/* Decorative circles */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d8b4aa]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#d8b4aa]/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Top label */}
          <div className="flex justify-center">
            <span className="rounded-full border border-[#d8ccc5] bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9b6f65] backdrop-blur">
              Sora Cosmetics
            </span>
          </div>

          {/* Heading */}
          <div className="mx-auto mt-7 max-w-4xl text-center">

            <h1
              className={`${montserrat.className} text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#292725] sm:text-6xl md:text-7xl lg:text-8xl`}
            >
              Beauty,{" "}
              <span className="text-[#b07d72]">
                beautifully
              </span>{" "}
              curated.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#706a65] sm:text-lg">
              Discover skincare, makeup and beauty essentials
              carefully selected to elevate your everyday routine.
            </p>

          </div>

          {/* Small stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

            <div className="rounded-full border border-[#ddd3cd] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#514b47] backdrop-blur">
              ✦ Premium Beauty
            </div>

            <div className="rounded-full border border-[#ddd3cd] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#514b47] backdrop-blur">
              ✦ Carefully Selected
            </div>

            <div className="rounded-full border border-[#ddd3cd] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#514b47] backdrop-blur">
              ✦ Everyday Luxury
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          SEARCH / FILTER
      ====================================================== */}
      <section className="sticky top-0 z-30 border-b border-[#e8e1dc] bg-[#faf8f5]/95 px-4 py-5 backdrop-blur-xl sm:px-6">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}
            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-base text-[#8d8580]">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 w-full rounded-2xl border border-[#ddd7d2] bg-white pl-12 pr-12 text-sm font-medium text-[#292725] shadow-[0_4px_20px_rgba(40,35,30,0.04)] outline-none transition placeholder:text-[#9a938e] focus:border-[#b07d72] focus:ring-4 focus:ring-[#b07d72]/10"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#918983] transition hover:text-[#292725]"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>

            {/* Category */}
            <div className="lg:w-64">

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="h-14 w-full cursor-pointer rounded-2xl border border-[#ddd7d2] bg-white px-5 text-sm font-semibold text-[#292725] shadow-[0_4px_20px_rgba(40,35,30,0.04)] outline-none transition focus:border-[#b07d72] focus:ring-4 focus:ring-[#b07d72]/10"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

            </div>

          </div>

          {/* Results */}
          <div className="mt-4 flex items-center justify-between">

            <p className="text-sm text-[#77706b]">
              <span className="font-bold text-[#292725]">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            {(search || selectedCategory !== "All") && (
              <button
                onClick={clearFilters}
                className="text-sm font-bold text-[#a4766b] transition hover:text-[#7e554d]"
              >
                Clear filters
              </button>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">

        <div className="mx-auto max-w-7xl">

          {filteredProducts.length === 0 ? (

            /* Empty state */
            <div className="rounded-[32px] border border-[#e3ddd8] bg-white px-6 py-24 text-center shadow-[0_10px_40px_rgba(40,35,30,0.05)]">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f3eee9] text-4xl">
                🛍️
              </div>

              <h2
                className={`${montserrat.className} mt-7 text-3xl font-bold text-[#292725]`}
              >
                No products found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-[#77706b]">
                We couldn't find anything matching your search.
                Try another product or category.
              </p>

              <button
                onClick={clearFilters}
                className="mt-7 rounded-full bg-[#292725] px-8 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#b07d72]"
              >
                View all products
              </button>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => (

                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-[28px] border border-[#e6e0db] bg-white shadow-[0_8px_30px_rgba(40,35,30,0.055)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(40,35,30,0.13)]"
                >

                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-[#f2efeb]">

                    <img
                      src={product.image}
                      alt={`${product.name} - Sora Cosmetics`}
                      loading="lazy"
                      className="h-[350px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    {/* Soft image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Category */}
                    {product.category && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#403a36] shadow-sm backdrop-blur-md">
                          {product.category}
                        </span>
                      </div>
                    )}

                    {/* Quick label */}
                    <div className="absolute bottom-4 left-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#514a46] shadow-sm backdrop-blur-md">
                        Sora Beauty
                      </span>
                    </div>

                  </div>

                  {/* Product Details */}
                  <div className="p-6">

                    <h2
                      className={`${montserrat.className} line-clamp-1 text-xl font-bold tracking-[-0.02em] text-[#292725]`}
                    >
                      {product.name}
                    </h2>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#77706b]">
                      Premium quality{" "}
                      {product.category?.toLowerCase() || "beauty"}{" "}
                      product from Sora Cosmetics.
                    </p>

                    {/* Price */}
                    <div className="mt-5 flex items-end justify-between">

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#99918c]">
                          Price
                        </p>

                        <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#a4766b]">
                          ETB {Number(product.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4efeb] text-lg transition-colors duration-300 group-hover:bg-[#ead8d3]">
                        ✦
                      </div>

                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={() => {
                        console.log("ADDING:", product);

                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: Number(product.price),
                          image: product.image,
                          category: product.category,
                          quantity: 1,
                        });
                      }}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#292725] py-4 text-sm font-bold text-white shadow-[0_6px_20px_rgba(40,35,30,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a4766b] hover:shadow-[0_10px_25px_rgba(164,118,107,0.25)] active:translate-y-0"
                    >
                      <span>Add to Cart</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          BRAND CTA
      ====================================================== */}
      <section className="border-t border-[#e3ddd8] bg-[#f1ebe6] px-6 py-20">

        <div className="mx-auto max-w-4xl text-center">

          <span className="text-2xl">
            ✦
          </span>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-[#a4766b]">
            Sora Cosmetics
          </p>

          <h2
            className={`${montserrat.className} mt-4 text-4xl font-extrabold tracking-tight text-[#292725] sm:text-5xl`}
          >
            Your beauty.
            <span className="text-[#a4766b]">
              {" "}Your ritual.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#706963]">
            Discover carefully selected beauty essentials designed
            to make your everyday routine feel a little more special.
          </p>

        </div>

      </section>

    </main>
  );
}