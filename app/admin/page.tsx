"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  products: any;
  total: number;
  created_at: string;
};


export default function AdminPage() {

  const router = useRouter();

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      router.push("/admin/login");
    }

  }, [router]);

  const [orders, setOrders] = useState<Order[]>([]);


  useEffect(() => {

    getOrders();

  }, []);



  const getOrders = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });


    if (error) {

      console.log(error);
      return;

    }


    setOrders(data || []);

  };



  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Admin Orders Dashboard 📦
      </h1>


      {orders.length === 0 ? (

        <p className="text-gray-500">
          No orders yet
        </p>

      ) : (


        <div className="space-y-6">


          {orders.map((order) => (

            <div
              key={order.id}
              className="rounded-2xl shadow p-6 bg-white"
            >

              <h2 className="text-xl font-bold">
                Customer: {order.customer_name}
              </h2>


              <p>
                Phone: {order.phone}
              </p>


              <p>
                Address: {order.address}
              </p>


              <p className="font-bold text-pink-600 mt-3">
                Total: ${order.total}
              </p>


              <h3 className="font-bold mt-4">
                Products:
              </h3>


              {order.products.map((item:any) => (

                <p key={item.id}>
                  {item.name} × {item.quantity}
                </p>

              ))}


              <p className="text-sm text-gray-500 mt-3">
                {new Date(order.created_at).toLocaleString()}
              </p>


            </div>

          ))}


        </div>

      )}

    </div>

  );
}