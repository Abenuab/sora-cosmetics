"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function MyOrders(){

  const [orders,setOrders] = useState<any[]>([]);


  useEffect(()=>{

    loadOrders();

  },[]);



  const loadOrders = async()=>{


    const {
      data:{user}
    } = await supabase.auth.getUser();



    if(!user){
      return;
    }



    const { data, error } = await supabase
  .from("orders")
  .select("*")
  .eq("customer_email", user.email?.toLowerCase())
  .order("id", {
    ascending: false,
  });


    console.log("USER:",user);
    console.log("ORDERS:",data);
    console.log("ERROR:",error);
console.log("USER EMAIL:", user.email);
console.log("MY ORDERS:", data);
console.log("ERROR:", error);


    if(error){
      alert(error.message);
      return;
    }


    setOrders(data || []);


  };



  return (

    <main className="p-8">

      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        My Orders 📦
      </h1>


      {
        orders.length === 0 ? (

          <p>No orders found</p>

        ) : (

          orders.map((order)=>(

          <div
  key={order.id}
  className="shadow-xl rounded-xl p-6 mb-5"
>
  <h2 className="text-xl font-bold">
    Order #{order.id}
  </h2>

  <div className="space-y-4 mt-4">
    {order.products?.map((item: any) => (
      <div
        key={item.id}
        className="flex items-center gap-4 border rounded-xl p-3"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />

        <div className="flex-1">
          <h3 className="font-bold">{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      </div>
    ))}
  </div>

  <h3 className="text-xl font-bold mt-5">
    Total: ${order.total}
  </h3>

  <p className="mt-2">
    Status:
    <span className="text-green-600 font-bold ml-2">
      {order.status}
    </span>
  </p>
</div>

          ))

        )
      }


    </main>

  );

}