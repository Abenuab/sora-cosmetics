"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function CartPage() {

  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();


  const router = useRouter();


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");



  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );





 const placeOrder = async () => {

  console.log("PLACE ORDER CLICKED");

  const {
    data:{user}
  } = await supabase.auth.getUser();

  console.log("ORDER USER:", user);


    if(!user){

      alert("Please login before checkout");

      router.push("/login");

      return;

    }




    if (!name || !phone || !address) {

      alert("Please fill all fields");

      return;

    }



console.log("ORDER USER:", user.email);
console.log("ORDER DATA:", {
 customer_email: user.email,
 total: total
});
console.log("INSERT DATA:", {
  customer_email: user?.email,
  total: total
});
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
        },
      ]);





    if(error){

      console.log(error);

      alert(error.message);

      return;

    }





    setMessage("Order placed successfully ✅");


    clearCart();



    setTimeout(()=>{

      router.push("/success");

    },1000);


  };





  return (

    <main className="min-h-screen bg-white dark:bg-gray-950 p-10">


      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Your Cart 🛒
      </h1>




      {
        cart.length === 0 ? (

          <p className="text-xl">
            Your cart is empty
          </p>

        ) : (


        <div className="space-y-6">



        {
          cart.map((item)=>(


          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-5 shadow-xl rounded-2xl p-5"
          >



          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-xl"
          />



          <div className="flex-1">

            <h2 className="text-2xl font-bold">
              {item.name}
            </h2>


            <p className="text-pink-600">
              ${item.price}
            </p>



            <div className="flex items-center gap-3 mt-4">


              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
                className="bg-gray-200 px-4 py-2 rounded"
              >
                -
              </button>



              <span className="text-xl">
                {item.quantity}
              </span>




              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
                className="bg-gray-200 px-4 py-2 rounded"
              >
                +
              </button>


            </div>


          </div>





          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            className="bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            Remove
          </button>



          </div>


          ))

        }




        <div className="text-right mt-10">


        <h2 className="text-3xl font-bold">
          Total: ${total}
        </h2>




        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-3 rounded-xl w-full mt-3"
        />



        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="border p-3 rounded-xl w-full mt-3"
        />



        <input
        placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          className="border p-3 rounded-xl w-full mt-3"
        />





        <button
          onClick={placeOrder}
          className="mt-5 bg-pink-600 text-white px-10 py-3 rounded-xl"
        >
          Checkout
        </button>



        <p className="text-green-600 font-bold mt-4">
          {message}
        </p>



        </div>


        </div>

        )

      }



    </main>

  );

}