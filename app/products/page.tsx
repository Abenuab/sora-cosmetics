"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

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
  const [selectedCategory, setSelectedCategory] =
    useState("All");

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
    ...Array.from(
      new Set(
        products.map((product) => product.category)
      )
    ),
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

  return (
    <main className="min-h-screen bg-[#fcfaf8]">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="px-5 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24">

        <div className="mx-auto max-w-5xl text-center">

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#9a7564]">
            Sora Cosmetics
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-[#1f1f1f] md:text-7xl">
            Beauty, Curated
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-[#b9a69b]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#77716d] md:text-base">
            Discover our carefully selected collection of
            skincare, makeup and beauty essentials,
            created to make every day feel beautiful.
          </p>

        </div>

      </section>


      {/* ========================================
          SEARCH + FILTER
      ======================================== */}

      <section className="px-5 md:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-[2rem] border border-[#e8e0db] bg-white p-5 shadow-[0_10px_40px_rgba(50,40,35,0.05)] md:p-6">

            <div className="flex flex-col gap-4 md:flex-row">

              {/* Search */}

              <div className="relative flex-1">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#9a8c84]">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search beauty products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#ded6d0] bg-[#fffdfb] py-3.5 pl-11 pr-4 text-sm text-[#333] outline-none transition placeholder:text-[#aaa09a] focus:border-[#8b6f61] focus:ring-2 focus:ring-[#8b6f61]/10"
                />

              </div>


              {/* Category */}

              <div className="relative md:w-56">

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-[#ded6d0] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#333] outline-none transition focus:border-[#8b6f61] focus:ring-2 focus:ring-[#8b6f61]/10"
                >

                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}

                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8b817b]">
                  ▼
                </span>

              </div>

            </div>


            {/* Category Pills */}

            <div className="mt-5 flex flex-wrap gap-2">

              {categories.map((cat) => (

                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(cat)
                  }
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition duration-300 ${
                    selectedCategory === cat
                      ? "bg-[#1f1f1f] text-white"
                      : "border border-[#e2d9d3] bg-white text-[#77716d] hover:border-[#1f1f1f] hover:text-[#1f1f1f]"
                  }`}
                >
                  {cat}
                </button>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          PRODUCTS
      ======================================== */}

      <section className="px-5 pb-20 pt-12 md:px-8 md:pt-16">

        <div className="mx-auto max-w-7xl">

          {/* Results Header */}

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7564]">
                Our Collection
              </p>

              <h2 className="mt-2 text-4xl font-semibold text-[#1f1f1f] md:text-5xl">
                Beauty Essentials
              </h2>

            </div>

            <p className="hidden text-sm text-[#8b817b] sm:block">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>

          </div>


          {/* Product Grid */}

          {filteredProducts.length === 0 ? (

            <div className="rounded-[2rem] border border-[#e8e0db] bg-white px-6 py-20 text-center shadow-[0_10px_40px_rgba(50,40,35,0.04)]">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f1ed] text-2xl">
                🔍
              </div>

              <h3 className="text-3xl font-semibold text-[#1f1f1f]">
                No products found
              </h3>

              <p className="mt-3 text-sm text-[#77716d]">
                Try another search or choose a
                different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-full bg-[#1f1f1f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#8b6f61]"
              >
                View All Products
              </button>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#e9e1dc] bg-white shadow-[0_10px_35px_rgba(50,40,35,0.05)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(50,40,35,0.10)]"
                >

                  {/* Image */}

                  <div className="relative h-80 overflow-hidden bg-[#f6f2ef]">

                    <img
                      src={product.image}
                      alt={`${product.name} - Sora Cosmetics beauty product`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category Badge */}

                    <div className="absolute left-4 top-4">

                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6f625b] shadow-sm backdrop-blur-sm">
                        {product.category}
                      </span>

                    </div>

                  </div>


                  {/* Product Info */}

                  <div className="p-5">

                    <h3 className="text-2xl font-semibold leading-tight text-[#1f1f1f]">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#817872]">
                      Premium quality{" "}
                      {product.category} product
                      from Sora Cosmetics.
                    </p>


                    {/* Price */}

                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a2948c]">
                          Price
                        </p>

                        <p className="mt-1 text-xl font-semibold text-[#8b6f61]">
                          ETB{" "}
                          {Number(
                            product.price
                          ).toFixed(2)}
                        </p>

                      </div>

                    </div>


                    {/* Add to Cart */}

                    <button
                      onClick={() => {

                        console.log(
                          "ADDING:",
                          product
                        );

                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: Number(
                            product.price
                          ),
                          image: product.image,
                          category:
                            product.category,
                          quantity: 1,
                        });

                      }}
                      className="mt-5 w-full rounded-full bg-[#1f1f1f] py-3.5 text-sm font-semibold tracking-wide text-white transition duration-300 hover:bg-[#8b6f61] hover:shadow-lg active:scale-[0.98]"
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ========================================
          BOTTOM BRAND SECTION
      ======================================== */}

      <section className="border-t border-[#e8e0db] bg-[#f8f4f1] px-5 py-16 md:px-8">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9a7564]">
            Sora Cosmetics
          </p>

          <h2 className="mt-4 text-4xl font-semibold text-[#1f1f1f] md:text-5xl">
            Beauty made beautifully.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#77716d]">
            Thoughtfully selected beauty essentials
            designed to become part of your everyday
            routine.
          </p>

        </div>

      </section>

    </main>
  );
}