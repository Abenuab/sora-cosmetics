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
  payment_status: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  tx_ref: string | null;
  customer_email?: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  // =========================
  // CHECK ADMIN LOGIN
  // =========================

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      router.push("/admin/login");
      return;
    }

    fetchOrders();
  };

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (error) {
      console.error("Fetch orders error:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    console.log("ORDERS FROM SUPABASE:", data);

    setOrders(data || []);
    setLoading(false);
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    const { error } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Order status error:",
        error
      );

      alert(error.message);
      return;
    }

    await fetchOrders();
  };

  // =========================
  // UPDATE PAYMENT STATUS
  // =========================

  const updatePaymentStatus = async (
    id: number,
    paymentStatus: string
  ) => {
    const updateData: {
      payment_status: string;
      status?: string;
    } = {
      payment_status: paymentStatus,
    };

    // If payment is completed,
    // automatically complete the order.
    if (paymentStatus === "Completed") {
      updateData.status = "Completed";
    }

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error(
        "Payment status error:",
        error
      );

      alert(error.message);
      return;
    }

    await fetchOrders();
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf7f5]">
        <div className="text-center">
          <div className="text-4xl">
            ⏳
          </div>

          <p className="mt-3 text-gray-600">
            Loading orders...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#faf7f5] p-5 md:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-pink-600">
          Orders Dashboard 📦
        </h1>

        <p className="mt-2 text-gray-600">
          Manage customer orders and verify
          Telebirr payments.
        </p>

      </div>

      {/* NO ORDERS */}

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

              {/* =========================
                  ORDER ID
              ========================= */}

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Order ID
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    #{order.id}
                  </p>

                </div>

                <div className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                  {order.status || "Pending"}
                </div>

              </div>

              {/* =========================
                  CUSTOMER
              ========================= */}

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {order.customer_name}
                </h2>

                {order.customer_email && (
                  <p className="mt-1 text-gray-600">
                    Email:{" "}
                    {order.customer_email}
                  </p>
                )}

                <p className="text-gray-600">
                  Phone: {order.phone}
                </p>

                <p className="text-gray-600">
                  Address: {order.address}
                </p>

              </div>

              {/* =========================
                  TOTAL
              ========================= */}

              <div className="mt-5 rounded-xl bg-gray-50 p-4">

                <p className="text-sm font-semibold text-gray-500">
                  TOTAL AMOUNT
                </p>

                <p className="mt-1 text-2xl font-bold text-pink-600">
                  ETB{" "}
                  {Number(
                    order.total
                  ).toFixed(2)}
                </p>

              </div>

              {/* =========================
                  PAYMENT INFORMATION
              ========================= */}

              <div className="mt-5 rounded-xl border border-pink-200 bg-pink-50 p-5">

                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Payment Information 💳
                </h3>

                {/* PAYMENT METHOD */}

                <div className="mb-3">

                  <p className="text-sm font-semibold text-gray-500">
                    PAYMENT METHOD
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {order.payment_method ||
                      "Not specified"}
                  </p>

                </div>

                {/* TRANSACTION ID */}

                <div className="mb-3">

                  <p className="text-sm font-semibold text-gray-500">
                    TELEBIRR TRANSACTION ID
                  </p>

                  <div className="mt-1 rounded-lg border border-pink-200 bg-white p-3">

                    {order.payment_reference ? (

                      <p className="break-all font-bold text-gray-900">
                        {order.payment_reference}
                      </p>

                    ) : (

                      <p className="font-medium text-red-500">
                        Not provided
                      </p>

                    )}

                  </div>

                </div>

                {/* INTERNAL ORDER REFERENCE */}

                <div className="mb-4">

                  <p className="text-sm font-semibold text-gray-500">
                    SORA ORDER REFERENCE
                  </p>

                  <p className="mt-1 break-all font-medium text-gray-700">
                    {order.tx_ref ||
                      "Not available"}
                  </p>

                </div>

                {/* PAYMENT STATUS */}

                <div>

                  <p className="mb-2 text-sm font-semibold text-gray-500">
                    PAYMENT STATUS
                  </p>

                  <select
                    value={
                      order.payment_status ||
                      "Pending"
                    }
                    onChange={(e) =>
                      updatePaymentStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 font-semibold text-gray-900 md:w-auto"
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

              {/* =========================
                  PRODUCTS
              ========================= */}

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                Products:
              </h3>

              <div className="mt-3 space-y-3">

                {order.products?.map(
                  (
                    item: any,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-xl border border-gray-200 p-3"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">

                        <p className="font-bold text-gray-900">
                          {item.name}
                        </p>

                        <p className="text-gray-600">
                          Quantity:{" "}
                          {item.quantity}
                        </p>

                        <p className="text-gray-600">
                          Price: ETB{" "}
                          {item.price}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* =========================
                  ORDER STATUS
              ========================= */}

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">

                <p className="mb-3 text-gray-700">

                  <span className="font-semibold">
                    Order Status:
                  </span>{" "}

                  {order.status ||
                    "Pending"}

                </p>

                <select
                  value={
                    order.status ||
                    "Pending"
                  }
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 md:w-auto"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

              {/* =========================
                  DATE
              ========================= */}

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