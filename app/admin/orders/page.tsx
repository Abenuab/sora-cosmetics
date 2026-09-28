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
  payment_status: string;
  payment_method: string;
  payment_reference: string;
  customer_email?: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/admin/login");
      return;
    }

    fetchOrders();
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setOrders(data || []);
  };

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchOrders();
  };

  const updatePaymentStatus = async (
    id: number,
    payment_status: string
  ) => {
    const { error } = await supabase
      .from("orders")
      .update({
        payment_status,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchOrders();
  };

  return (
    <main className="min-h-screen bg-[#faf7f5] p-8">
      <h1 className="mb-8 text-4xl font-bold text-pink-600">
        Orders Dashboard 📦
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <p className="text-lg text-gray-600">
            No orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-white p-6 shadow-xl"
            >
              {/* Customer */}
              <h2 className="text-2xl font-bold text-gray-900">
                {order.customer_name}
              </h2>

              {order.customer_email && (
                <p className="mt-1 text-gray-600">
                  Email: {order.customer_email}
                </p>
              )}

              <p className="text-gray-600">
                Phone: {order.phone}
              </p>

              <p className="text-gray-600">
                Address: {order.address}
              </p>

              {/* Total */}
              <p className="mt-4 text-xl font-bold text-pink-600">
                Total: ETB {order.total}
              </p>

              {/* Payment Information */}
              <div className="mt-5 rounded-xl border border-pink-200 bg-pink-50 p-4">
                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  Payment Information 💳
                </h3>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Method:
                  </span>{" "}
                  {order.payment_method || "Not specified"}
                </p>

                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">
                    Transaction ID:
                  </span>{" "}
                  {order.payment_reference || "Not provided"}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="font-semibold">
                    Payment Status:
                  </span>

                  <select
                    value={order.payment_status || "Pending"}
                    onChange={(e) =>
                      updatePaymentStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="rounded-lg border border-gray-300 bg-white p-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <h3 className="mt-6 text-lg font-bold text-gray-900">
                Products:
              </h3>

              <div className="mt-3 space-y-3">
                {order.products?.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-xl border border-gray-200 p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-bold text-gray-900">
                          {item.name}
                        </p>

                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-gray-600">
                          Price: ETB {item.price}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Order Status */}
              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-gray-700">
                  <span className="font-semibold">
                    Order Status:
                  </span>{" "}
                  {order.status}
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="rounded-lg border border-gray-300 bg-white p-2"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Order Date */}
              <p className="mt-4 text-sm text-gray-500">
                Order Date:{" "}
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}