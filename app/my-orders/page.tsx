"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number | string;
  customer_name: string;
  customer_email: string;
  phone: string;
  address: string;
  products: {
    id: number | string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
  }[];
  total: number;
  status: string;
  payment_status: string;
  tx_ref: string;
  created_at: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", user.email)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("ORDERS ERROR:", error);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf7] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#eadfd8] border-t-[#c08472]" />

          <p className="mt-6 text-[#756a64]">
            Loading your orders...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf7] via-white to-[#f8f1ed] px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#b08a7c]">
            Sora Cosmetics
          </p>

          <h1 className="font-[var(--font-cormorant)] text-5xl font-semibold text-[#241f1c] md:text-6xl">
            My Orders
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#756a64]">
            View your orders, products, payment status and delivery
            information.
          </p>

          {userEmail && (
            <p className="mt-3 text-sm text-[#9a8d86]">
              {userEmail}
            </p>
          )}
        </div>

        {/* Not logged in */}
        {!userEmail ? (
          <div className="rounded-3xl border border-[#eadfd8] bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🔐</div>

            <h2 className="mt-5 font-[var(--font-cormorant)] text-3xl font-semibold text-[#241f1c]">
              Please Login
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#756a64]">
              You need to login to see your orders.
            </p>

            <a
              href="/login"
              className="mt-7 inline-block rounded-full bg-[#241f1c] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b6f61]"
            >
              Login
            </a>
          </div>
        ) : orders.length === 0 ? (

          /* No orders */
          <div className="rounded-3xl border border-[#eadfd8] bg-white p-12 text-center shadow-sm">
            <div className="text-6xl">🛍️</div>

            <h2 className="mt-6 font-[var(--font-cormorant)] text-3xl font-semibold text-[#241f1c]">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#756a64]">
              You haven't placed any orders yet. Explore our beauty
              collection and find something you love.
            </p>

            <a
              href="/products"
              className="mt-7 inline-block rounded-full bg-[#241f1c] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b6f61]"
            >
              Shop Products
            </a>
          </div>

        ) : (

          /* Orders */
          <div className="space-y-8">
            {orders.map((order) => {

              const orderDate = new Date(
                order.created_at
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              const paymentCompleted =
                order.payment_status?.toLowerCase() ===
                "completed";

              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-[#eadfd8] bg-white shadow-sm"
                >

                  {/* Order Header */}
                  <div className="border-b border-[#eee7e2] bg-[#fffaf7] p-6 md:p-7">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a39187]">
                          Order
                        </p>

                        <h2 className="mt-1 text-lg font-bold text-[#241f1c]">
                          #{order.id}
                        </h2>

                        <p className="mt-1 text-sm text-[#82756e]">
                          {orderDate}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-bold ${
                            paymentCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          Payment:{" "}
                          {order.payment_status ||
                            "Pending"}
                        </span>

                        <span className="rounded-full bg-[#f1ebe7] px-4 py-2 text-xs font-bold capitalize text-[#5f534c]">
                          Order:{" "}
                          {order.status || "Pending"}
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="p-6 md:p-7">

                    <h3 className="mb-5 font-[var(--font-cormorant)] text-2xl font-semibold text-[#241f1c]">
                      Products
                    </h3>

                    <div className="space-y-4">
                      {Array.isArray(order.products) &&
                        order.products.map((product, index) => (

                          <div
                            key={`${product.id}-${index}`}
                            className="flex items-center gap-4 rounded-2xl border border-[#eee7e2] p-4"
                          >

                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-20 w-20 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#f5efeb] text-2xl">
                                💄
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <h4 className="truncate font-semibold text-[#241f1c]">
                                {product.name}
                              </h4>

                              {product.category && (
                                <p className="mt-1 text-xs text-[#958780]">
                                  {product.category}
                                </p>
                              )}

                              <p className="mt-2 text-sm text-[#756a64]">
                                {product.quantity} ×{" "}
                                {Number(product.price).toLocaleString()} ETB
                              </p>
                            </div>

                            <p className="font-bold text-[#8b6f61]">
                              {(
                                Number(product.price) *
                                product.quantity
                              ).toLocaleString()}{" "}
                              ETB
                            </p>

                          </div>

                        ))}
                    </div>

                    {/* Order Details */}
                    <div className="mt-8 grid gap-6 border-t border-[#eee7e2] pt-7 md:grid-cols-2">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a39187]">
                          Delivery Information
                        </p>

                        <p className="mt-3 font-semibold text-[#241f1c]">
                          {order.customer_name}
                        </p>

                        <p className="mt-1 text-sm text-[#756a64]">
                          {order.phone}
                        </p>

                        <p className="mt-1 text-sm text-[#756a64]">
                          {order.address}
                        </p>
                      </div>

                      <div className="md:text-right">

                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a39187]">
                          Total
                        </p>

                        <p className="mt-2 font-[var(--font-cormorant)] text-4xl font-semibold text-[#8b6f61]">
                          {Number(
                            order.total
                          ).toLocaleString()}{" "}
                          ETB
                        </p>

                        {order.tx_ref && (
                          <p className="mt-2 break-all text-xs text-[#a39791]">
                            Ref: {order.tx_ref}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}