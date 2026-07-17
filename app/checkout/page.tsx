"use client";

import { useState } from "react";

export default function Checkout() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  function sendOrder() {

    const message = `
New Sora Cosmetics Order:

Name: ${name}
Phone: ${phone}
Address: ${address}

Thank you.
`;

    const whatsapp =
      "https://wa.me/251996012811?text=" +
      encodeURIComponent(message);


    window.open(whatsapp, "_blank");
  }


  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 p-10">

      <h1 className="text-5xl font-bold text-center text-pink-600">
        Checkout
      </h1>


      <div className="max-w-xl mx-auto mt-10 space-y-5">

        <input
          placeholder="Your Name"
          className="w-full p-4 rounded-xl border"
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          placeholder="Phone Number"
          className="w-full p-4 rounded-xl border"
          onChange={(e)=>setPhone(e.target.value)}
        />


        <textarea
          placeholder="Address"
          className="w-full p-4 rounded-xl border"
          onChange={(e)=>setAddress(e.target.value)}
        />


        <button
          onClick={sendOrder}
          className="w-full bg-green-600 text-white py-4 rounded-xl"
        >
          Send Order WhatsApp
        </button>

      </div>

    </main>
  );
}