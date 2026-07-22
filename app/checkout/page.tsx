"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";


export default function CheckoutPage() {

  const { cart, clearCart } = useCart();
console.log("CHECKOUT CART:", cart);
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [txRef, setTxRef] = useState("");

  const [userChecked, setUserChecked] = useState(false);



  useEffect(() => {

    const checkUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();


      if (!user) {

        alert("Please login before checkout");

        router.push("/login");

        return;

      }


      setEmail(user.email || "");

      setUserChecked(true);

    };


    checkUser();

  }, [router]);



  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );



  const handlePayment = async () => {


    if (!name || !phone || !address) {

      alert("Please fill all fields");

      return;

    }


    const newTxRef = "sora-" + Date.now();

    setTxRef(newTxRef);



    // Create order first

    const {
      data: { user },
    } = await supabase.auth.getUser();



    if (!user) {

      alert("Please login");

      return;

    }



    const { error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: name,
          phone: phone,
          address: address,
          products: cart,
          total: total,
          customer_email: user.email,
          status: "Pending",
          payment_status: "Pending",
          tx_ref: newTxRef,
        },
      ]);



    if (error) {

      console.log("ORDER ERROR:", error);

      alert(error.message);

      return;

    }


console.log("Cart:", cart);
console.log("Total:", total);
    const res = await fetch("/api/chapa", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },


      body: JSON.stringify({

        amount: total,

        email: email,

        first_name: name,

        phone: phone,

        tx_ref: newTxRef,

      }),

    });



    const data = await res.json();



    console.log(data);



    if (data.status === "success") {


      window.location.href =
        data.data.checkout_url;


    } else {


      alert("Payment initialization failed");


      console.log(data);


    }


  };




  if (!userChecked) {

    return (

      <div className="p-8 text-center text-xl">

        Checking login...

      </div>

    );

  }




  return (

    <div className="p-8 max-w-xl mx-auto">


      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>



      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Full Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />



      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Phone Number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />



      <textarea
        className="w-full border p-3 rounded mb-4"
        placeholder="Address"
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
      />



      <h2 className="text-xl font-bold mb-4">
        Total: ${total}
      </h2>



      <button
        onClick={handlePayment}
        className="w-full bg-pink-600 text-white p-3 rounded-xl"
      >
        Pay with Chapa
      </button>


    </div>

  );

}