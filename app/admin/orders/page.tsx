"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  products: any[];
  total: number;
  status: string;
  created_at: string;
};



export default function AdminOrdersPage() {


  const [orders, setOrders] = useState<Order[]>([]);

const router = useRouter();


useEffect(() => {

  checkUser();
  fetchOrders();

}, []);



const checkUser = async () => {

  const { data } = await supabase.auth.getUser();


  if (!data.user) {
    router.push("/admin/login");
  }

};

  useEffect(() => {
    fetchOrders();
  }, []);



  const fetchOrders = async () => {


    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", {
        ascending: false,
      });



    if(error){

      alert(error.message);
      return;

    }


    setOrders(data || []);

  };





  const updateStatus = async (
    id:number,
    status:string
  ) => {


    const { error } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);



    if(error){

      alert(error.message);
      return;

    }


    fetchOrders();

  };





  return (

    <main className="p-8">


      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Orders Dashboard 📦
      </h1>



      <div className="space-y-6">


        {
          orders.map((order)=>(


            <div
              key={order.id}
              className="shadow-xl rounded-2xl p-6"
            >


              <h2 className="text-2xl font-bold">
                {order.customer_name}
              </h2>


              <p>
                Phone: {order.phone}
              </p>


              <p>
                Address: {order.address}
              </p>


             <p className="font-bold mt-3">
  Total: ${order.total}
</p>


<h3 className="font-bold mt-5">
  Products:
</h3>


<div className="mt-3 space-y-3">

{
  order.products?.map((item:any, index:number)=>(

    <div
      key={index}
      className="flex items-center gap-4 border p-3 rounded-xl"
    >

      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />


      <div>

        <p className="font-bold">
          {item.name}
        </p>

        <p>
          Quantity: {item.quantity}
        </p>

        <p>
          Price: ${item.price}
        </p>

      </div>


    </div>

  ))
}

</div>


<p className="mt-5">
  Status: {order.status}
</p>



              <div className="mt-4">

                <select
                  value={order.status}
                  onChange={(e)=>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    Completed
                  </option>


                </select>

              </div>


            </div>


          ))
        }


      </div>


    </main>

  );

}