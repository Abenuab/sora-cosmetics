"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
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

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");



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


    if (cart.length === 0) {

      alert("Your cart is empty");

      return;

    }


    setLoading(true);



    try {


      const {
        data:{ user }
      } = await supabase.auth.getUser();



      if (!user) {

        alert("Please login before checkout");

        router.push("/login");

        return;

      }



      const txRef =
        "sora-" + Date.now();



      const { error } =
        await supabase
        .from("orders")
        .insert([
          {

            customer_name:name,

            phone:phone,

            address:address,

            products:cart,

            total:total,

            customer_email:user.email,

            status:"Pending",

            payment_status:"Pending",

            tx_ref:txRef,

          }
        ]);



      if(error){

        console.log(error);

        alert(error.message);

        return;

      }



      const res = await fetch(
        "/api/chapa",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            amount:total,

            email:user.email,

            first_name:name,

            phone:phone,

            tx_ref:txRef,

          })

        }
      );


      const data =
        await res.json();



      console.log(
        "CHAPA RESPONSE:",
        data
      );



      if(
        data.status === "success"
      ){

        clearCart();


        window.location.href =
          data.data.checkout_url;


      }
      else{

        alert(
          "Payment initialization failed"
        );

        console.log(data);

      }



    }
    catch(error){

      console.log(error);

      alert(
        "Something went wrong"
      );


    }
    finally{

      setLoading(false);

    }


  };
    return (

    <main className="min-h-screen bg-white dark:bg-gray-950 p-6 md:p-10">


      <h1 className="text-4xl font-bold text-pink-600 mb-10">
        Your Cart 🛒
      </h1>



      {
        cart.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              Your cart is empty
            </h2>

            <button
              onClick={() => router.push("/products")}
              className="mt-6 bg-pink-600 text-white px-8 py-3 rounded-xl"
            >
              Continue Shopping
            </button>

          </div>


        ) : (


          <div className="grid lg:grid-cols-3 gap-10">


            {/* Cart Products */}

            <div className="lg:col-span-2 space-y-6">


              {
                cart.map((item)=>(


                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center gap-5 bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-5"
                  >


                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />



                    <div className="flex-1">


                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>



                      <p className="text-pink-600 text-xl font-bold">
                        ${item.price}
                      </p>



                      <div className="flex items-center gap-4 mt-5">


                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                          -
                        </button>



                        <span className="text-xl font-bold">
                          {item.quantity}
                        </span>



                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                          +
                        </button>


                      </div>


                    </div>




                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="bg-red-600 text-white px-5 py-3 rounded-xl"
                    >
                      Remove
                    </button>


                  </div>


                ))
              }


            </div>
                        {/* Checkout Section */}

            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-6 h-fit">


              <h2 className="text-3xl font-bold mb-6">
                Checkout
              </h2>



              <div className="mb-6">

                <p className="text-gray-500">
                  Total Amount
                </p>

                <h3 className="text-4xl font-bold text-pink-600">
                  ${total}
                </h3>

              </div>




              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>
                  setName(e.target.value)
                }
                className="w-full border p-3 rounded-xl mb-4"
              />




              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e)=>
                  setPhone(e.target.value)
                }
                className="w-full border p-3 rounded-xl mb-4"
              />





              <textarea

                placeholder="Delivery Address"

                value={address}

                onChange={(e)=>
                  setAddress(e.target.value)
                }

                className="w-full border p-3 rounded-xl mb-4 h-28"

              />





              <button

                onClick={handlePayment}

                disabled={loading}

                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold text-lg"

              >

                {
                  loading
                  ?
                  "Processing..."
                  :
                  "Pay with Chapa 💳"
                }


              </button>




              {
                message && (

                  <p className="text-green-600 font-bold mt-4 text-center">
                    {message}
                  </p>

                )
              }


            </div>


          </div>


        )

      }


    </main>

  );


}