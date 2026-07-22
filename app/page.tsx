"use client";

import Link from "next/link";

export default function Home() {


  return (

    <main className="min-h-screen bg-white dark:bg-gray-950">


      {/* Hero Section */}

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
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
            alt="Cosmetics"
            className="w-full h-[500px] object-cover"
          />


        </div>



      </section>





      {/* Features */}


      <section className="p-10 grid md:grid-cols-3 gap-8">


        <div className="shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-2xl font-bold">
            Premium Quality
          </h2>

          <p className="mt-3 text-gray-500">
            Carefully selected beauty products.
          </p>

        </div>




        <div className="shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-2xl font-bold">
            Fast Delivery
          </h2>

          <p className="mt-3 text-gray-500">
            Get your order quickly.
          </p>

        </div>





        <div className="shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-2xl font-bold">
            Secure Shopping
          </h2>

          <p className="mt-3 text-gray-500">
            Easy and safe checkout.
          </p>

        </div>


      </section>


    </main>

  );

}