"use client";
import Link from "next/link";
import { useState } from "react";
export default function home () {
  const [dark, setDark] = useState(false);
  return (
    <main className={dark ? "min-h-screen bg-gray-950 text-white" : "min-h-screen bg-white text-black"}>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-10 py-6 shadow-sm">
        <h1 className="text-3xl font-bold text-pink-600">
          ✨ SORA
<span className="text-pink-500"> COSMETICS</span>
        </h1><button
  onClick={() => setDark(!dark)}
  className="bg-black text-white px-5 py-2 rounded-full"
>
  🌙 Dark
  <button className="md:hidden text-3xl">
  ☰
</button>
</button>
        

        <nav className="hidden md:flex space-x-6 items-center">

  <Link href="/">
    Home
  </Link>

  <Link href="/products">
    Products
  </Link>
  <Link href="/about">
  About
</Link>

<Link href="/contact">
  Contact
</Link>

  <Link href="/checkout">
    Checkout
  </Link>

  <Link href="/cart">
    🛒 Cart
  </Link>

</nav>
      </header>


      {/* Hero Section */}
<section className="grid md:grid-cols-2 items-center gap-12 px-6 md:px-12 py-20">

  <div className="space-y-6">

    <h2 className="text-5xl md:text-6xl font-bold leading-tight">
      Beauty That Makes You
      <span className="text-pink-600"> Shine</span>
    </h2>

    <p className="text-gray-600 dark:text-gray-300 text-lg">
      Discover premium skincare and cosmetics
      designed to reveal your natural beauty.
    </p>


    <div className="flex gap-4">

      <button className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700">
        Shop Now
      </button>

      <button className="border border-pink-600 text-pink-600 px-8 py-3 rounded-full">
        Learn More
      </button>

    </div>

  </div>


  <div className="relative">

    <img
      src="/images/cream.jpg"
      alt="Beauty Product"
      className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
    />

    <div className="absolute bottom-5 left-5 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      ⭐ Premium Quality
    </div>

  </div>

</section>
{/* Categories */}
<section className="px-6 md:px-10 py-16">

  <h2 className="text-4xl font-bold text-center mb-10">
    Shop By Category
  </h2>


  <div className="grid md:grid-cols-3 gap-8">


    <div className="p-8 rounded-3xl shadow-lg text-center bg-pink-50 dark:bg-gray-900">

      <h3 className="text-3xl font-bold text-pink-600">
        Skincare
      </h3>

      <p className="mt-3">
        Creams, serums and daily skin care products.
      </p>

    </div>



    <div className="p-8 rounded-3xl shadow-lg text-center bg-pink-50 dark:bg-gray-900">

      <h3 className="text-3xl font-bold text-pink-600">
        Makeup
      </h3>

      <p className="mt-3">
        Lipstick, foundation and beauty essentials.
      </p>

    </div>



    <div className="p-8 rounded-3xl shadow-lg text-center bg-pink-50 dark:bg-gray-900">

      <h3 className="text-3xl font-bold text-pink-600">
        Haircare
      </h3>

      <p className="mt-3">
        Hair treatment and nourishing products.
      </p>

    </div>


  </div>

</section>


      {/* Products */}
      <section className="px-10 py-16">

        <h2 className="text-4xl font-bold text-center mb-10">
          Our Products
        </h2>


        <div className="grid md:grid-cols-3 gap-8">

          <Product
            image="/images/3.jpg"
            name="Luxury Face Cream"
          />

          <Product
            image="/images/2.jpg"
            name="Premium Lipstick"
          />

          <Product
            image="/images/4.jpg"
            name="Glow Serum"
          />

        </div>

      </section>
<footer className="mt-20 bg-gray-900 text-white p-10">

  <div className="grid md:grid-cols-3 gap-8">

    <div>
      <h2 className="text-3xl font-bold text-pink-500">
        ✨ Sora Cosmetics
      </h2>

      <p className="mt-3 text-gray-300">
        Real beauty, real result.
      </p>
    </div>


    <div>
      <h3 className="text-xl font-bold">
        Quick Links
      </h3>

      <p className="mt-3">Home</p>
      <p>Products</p>
      <p>About</p>
      <p>Contact</p>
    </div>


    <div>
      <h3 className="text-xl font-bold">
        Follow Us
      </h3>

      <a 
 href="https://instagram.com/"
 target="_blank"
>
 📸 Instagram
</a>


<a
 href="https://facebook.com/"
 target="_blank"
>
 👍 Facebook
</a>


<a
 href="https://tiktok.com/"
 target="_blank"
>
 🎵 TikTok
</a>

    </div>

  </div>


  <p className="text-center mt-10 text-gray-400">
    © 2026 Sora Cosmetics. All rights reserved.
  </p>
<a
  href="https://wa.me/251996012811"
  target="_blank"
  className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-full shadow-xl text-lg font-bold"
>
  💬 WhatsApp
</a>
</footer>
    </main>
  );
}


function Product({image, name}: {image:string, name:string}) {
  return (
    <div className="rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-gray-900">

      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">
            {name}
          </h3>

          <span className="text-yellow-500">
            ⭐⭐⭐⭐⭐
          </span>
        </div>


        <p className="text-pink-600 text-xl font-bold mt-3">
          $25
        </p>


        <p className="text-gray-500 mt-2">
          Premium quality beauty product for your daily care.
        </p>


        <a
          href="https://wa.me/251996012811"
          target="_blank"
          className="mt-5 block text-center bg-green-600 text-white py-3 rounded-full hover:bg-green-700"
        >
          Order on WhatsApp
        </a>

      </div>

    </div>
  );
}