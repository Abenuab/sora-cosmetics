"use client";

import Link from "next/link";

export default function Hero() {

  return (

    <section className="grid md:grid-cols-2 gap-10 items-center p-10">


      <div>

        <h1 className="text-6xl font-bold text-pink-600">
          Beauty Starts With Sora ✨
        </h1>


        <p className="text-gray-600 dark:text-gray-300 text-xl mt-6">
          Discover premium cosmetics designed
          to make you feel confident and beautiful.
        </p>


        <Link
          href="/products"
          className="inline-block mt-8 bg-pink-600 text-white px-8 py-4 rounded-xl"
        >
          Shop Now
        </Link>


      </div>



      <div className="rounded-3xl overflow-hidden shadow-xl">

        <img
          src="/images/cream.jpg"
          alt="Sora Cosmetics"
          className="w-full h-[500px] object-cover"
        />

      </div>


    </section>

  );

}