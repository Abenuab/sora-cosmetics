"use client";

import { useState, useEffect } from "react";

export default function Cart() {

  const [items, setItems] = useState<any[]>([]);


  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setItems([JSON.parse(savedCart)]);
    }
  }, []);


  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 p-10">

      <h1 className="text-5xl font-bold text-pink-600 text-center">
        Your Cart 🛒
      </h1>


      {items.map((item) => (
        <div
          key={item.name}
          className="max-w-xl mx-auto mt-10 p-6 rounded-3xl shadow-lg"
        >

          <img
            src={item.image}
            className="w-full h-72 object-cover rounded-xl"
          />

          <h2 className="text-2xl font-bold mt-5">
            {item.name}
          </h2>

          <p className="text-pink-600 text-xl mt-2">
            ${item.price}
          </p>


          <button
            onClick={() => setItems([])}
            className="mt-5 bg-red-600 text-white px-6 py-3 rounded-full"
          >
            Remove
          </button>


          <button
            className="mt-5 ml-3 bg-green-600 text-white px-6 py-3 rounded-full"
          >
            Checkout
          </button>

        </div>
      ))}

    </main>
  );
}