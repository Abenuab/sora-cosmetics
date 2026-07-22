"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Success(){

  useEffect(() => {

    const verifyPayment = async () => {

      const params = new URLSearchParams(window.location.search);

      const tx_ref = params.get("tx_ref");


      if (!tx_ref) return;


      await fetch("/api/chapa/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref,
        }),
      });

    };


    verifyPayment();

  }, []);


  return (

    <main className="min-h-screen flex items-center justify-center p-8">

      <div className="text-center shadow-xl rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-green-600">
          ✅ Order Successful
        </h1>


        <p className="mt-5 text-xl">
          Thank you for your order.
        </p>


        <p className="mt-2">
          Your payment is being verified.
        </p>


        <Link
          href="/my-orders"
          className="inline-block mt-8 bg-pink-600 text-white px-8 py-3 rounded-xl"
        >
          View My Orders
        </Link>


      </div>

    </main>

  );

}