"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-950 dark:via-gray-900 dark:to-pink-950">

      {/* Background glow */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>


      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">


        {/* Text */}
        <div className="z-10">

          <p className="text-pink-600 font-semibold mb-4">
            ✨ Premium Beauty Collection
          </p>


          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
            Reveal Your
            <span className="text-pink-600">
              {" "}Natural Beauty
            </span>
          </h1>


          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Discover premium skincare and beauty products
            designed to make you feel confident every day.
          </p>



          <div className="flex flex-wrap gap-4 mt-8">


            <Link
              href="/products"
              className="px-8 py-4 rounded-full bg-pink-600 text-white font-semibold shadow-lg hover:bg-pink-700 hover:scale-105 transition"
            >
              Shop Now 🛍
            </Link>



            <Link
              href="/about"
              className="px-8 py-4 rounded-full border border-pink-600 text-pink-600 font-semibold hover:bg-pink-50 transition"
            >
              Learn More
            </Link>


          </div>


          <div className="flex gap-8 mt-10">

            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                10K+
              </h3>
              <p className="text-gray-500">
                Customers
              </p>
            </div>


            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                4.9★
              </h3>
              <p className="text-gray-500">
                Rating
              </p>
            </div>


            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                100%
              </h3>
              <p className="text-gray-500">
                Quality
              </p>
            </div>


          </div>


        </div>




        {/* Image */}
        <div className="relative flex justify-center">


          <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-2xl"></div>


          <img
            src="/images/cream.jpg"
            alt="Sora Cosmetics Beauty"
            className="relative z-10 w-full max-w-md rounded-[3rem] shadow-2xl object-cover hover:scale-105 transition duration-500"
          />


        </div>


      </div>


    </section>
  );
}