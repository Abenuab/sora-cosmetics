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
  const [paymentReference, setPaymentReference] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill all customer information");
      return;
    }

    if (!paymentReference.trim()) {
      alert("Please enter your Telebirr transaction ID");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login before checkout");
        router.push("/login");
        return;
      }

      const orderRef = "telebirr-" + Date.now();

      const { error } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            products: cart,
            total: total,
            customer_email: user.email,

            status: "Pending",
            payment_status: "Pending",

            tx_ref: orderRef,

            payment_method: "Telebirr",
            payment_reference: paymentReference.trim(),
          },
        ]);

      if (error) {
        console.error("Order error:", error);
        alert(error.message);
        return;
      }

      clearCart();

      setMessage(
        "Order submitted successfully. Your payment will be verified."
      );

      setTimeout(() => {
        router.push("/success");
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfaf8] px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}

        <div className="mb-12 text-center">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9a7564]">
            Sora Cosmetics
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-[#1f1f1f] md:text-6xl">
            Your Cart
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-[#b9a69b]" />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#77716d]">
            Review your beauty essentials and complete
            your order with ease.
          </p>

        </div>

        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#e9e1dc] bg-white px-6 py-20 text-center shadow-[0_15px_50px_rgba(50,40,35,0.06)]">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f1ed] text-3xl">
              🛍️
            </div>

            <h2 className="text-4xl font-semibold text-[#1f1f1f]">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#77716d]">
              Discover something beautiful from our
              collection and add it to your cart.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-8 rounded-full bg-[#1f1f1f] px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition duration-300 hover:bg-[#8b6f61] hover:shadow-lg"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="grid items-start gap-10 lg:grid-cols-3">

            {/* CART PRODUCTS */}

            <div className="space-y-5 lg:col-span-2">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7564]">
                    Shopping Bag
                  </p>

                  <p className="mt-1 text-sm text-[#77716d]">
                    {cart.length}{" "}
                    {cart.length === 1
                      ? "item"
                      : "items"}{" "}
                    in your cart
                  </p>
                </div>

                <button
                  onClick={clearCart}
                  className="text-xs font-semibold uppercase tracking-wider text-[#9a7564] transition hover:text-[#1f1f1f]"
                >
                  Clear Cart
                </button>

              </div>

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="group flex flex-col gap-5 rounded-[1.75rem] border border-[#ebe4df] bg-white p-5 shadow-[0_10px_35px_rgba(50,40,35,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(50,40,35,0.08)] sm:flex-row sm:items-center"
                >

                  {/* PRODUCT IMAGE */}

                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl bg-[#f6f2ef] sm:h-32 sm:w-32">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  </div>

                  {/* PRODUCT DETAILS */}

                  <div className="flex-1">

                    <h2 className="text-3xl font-semibold text-[#1f1f1f]">
                      {item.name}
                    </h2>

                    {item.category && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-[#a2948c]">
                        {item.category}
                      </p>
                    )}

                    <p className="mt-3 text-lg font-semibold text-[#8b6f61]">
                      ETB {Number(item.price).toFixed(2)}
                    </p>

                    {/* QUANTITY */}

                    <div className="mt-5 flex items-center gap-3">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5cf] text-lg text-[#333] transition hover:border-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span className="flex min-w-8 justify-center text-sm font-semibold text-[#333]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5cf] text-lg text-[#333] transition hover:border-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="self-start rounded-full border border-[#eaded8] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#9a7564] transition hover:border-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white sm:self-center"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* CHECKOUT */}

            <div className="lg:sticky lg:top-28">

              <div className="rounded-[2rem] border border-[#e7ded8] bg-white p-6 shadow-[0_15px_50px_rgba(50,40,35,0.07)] md:p-8">

                {/* CHECKOUT HEADER */}

                <div className="mb-7">

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7564]">
                    Secure Checkout
                  </p>

                  <h2 className="mt-2 text-4xl font-semibold text-[#1f1f1f]">
                    Checkout
                  </h2>

                </div>

                {/* TOTAL */}

                <div className="mb-7 rounded-2xl bg-[#f8f4f1] p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-[#77716d]">
                      Total Amount
                    </span>

                    <span className="text-xs uppercase tracking-wider text-[#9a7564]">
                      ETB
                    </span>

                  </div>

                  <div className="mt-2 text-4xl font-semibold text-[#1f1f1f]">
                    ETB {total.toFixed(2)}
                  </div>

                </div>

                {/* CUSTOMER INFORMATION */}

                <div className="space-y-4">

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#77716d]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#ded6d0] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#333] outline-none transition placeholder:text-[#aaa09a] focus:border-[#8b6f61] focus:ring-2 focus:ring-[#8b6f61]/10"
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#77716d]">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#ded6d0] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#333] outline-none transition placeholder:text-[#aaa09a] focus:border-[#8b6f61] focus:ring-2 focus:ring-[#8b6f61]/10"
                    />

                  </div>

                  {/* ADDRESS */}

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#77716d]">
                      Delivery Address
                    </label>

                    <textarea
                      placeholder="Enter your delivery address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      className="h-28 w-full resize-none rounded-xl border border-[#ded6d0] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#333] outline-none transition placeholder:text-[#aaa09a] focus:border-[#8b6f61] focus:ring-2 focus:ring-[#8b6f61]/10"
                    />

                  </div>

                </div>

                {/* TELEBIRR PAYMENT */}

                <div className="mt-6 rounded-2xl border border-[#e5d8cf] bg-[#faf6f3] p-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7564]">
                    Payment Method
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-[#1f1f1f]">
                    📱 Telebirr
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#77716d]">
                    Send the exact amount shown above to our
                    Telebirr account, then enter your transaction
                    ID below.
                  </p>

                  {/* TELEBIRR ACCOUNT */}

                  <div className="mt-4 rounded-xl bg-white p-4">

                    <p className="text-xs font-medium uppercase tracking-wider text-[#99908b]">
                      Telebirr Number
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#1f1f1f]">
                      0996012811
                    </p>

                    <p className="mt-2 text-xs text-[#77716d]">
                      Account Name: Abenezer Fikadu
                    </p>

                  </div>

                  {/* TRANSACTION ID */}

                  <div className="mt-4">

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#77716d]">
                      Telebirr Transaction ID
                    </label>

                    <input
                      type="text"
                      placeholder="Enter transaction ID"
                      value={paymentReference}
                      onChange={(e) =>
                        setPaymentReference(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-[#ded6d0] bg-white px-4 py-3.5 text-sm text-[#333] outline-none transition placeholder:text-[#aaa09a] focus:border-[#8b6f61] focus:ring-2 focus:ring-[#8b6f61]/10"
                    />

                  </div>

                </div>

                {/* SUBMIT ORDER */}

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-6 w-full rounded-full bg-[#1f1f1f] py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition duration-300 hover:bg-[#8b6f61] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Submitting Order..."
                    : "Place Order • Telebirr"}
                </button>

                {/* PAYMENT NOTICE */}

                <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#8b817b]">

                  <span>🔒</span>

                  <span>
                    Payment will be verified before your
                    order is completed.
                  </span>

                </div>

                {/* SUCCESS MESSAGE */}

                {message && (
                  <p className="mt-4 text-center text-sm font-semibold text-green-600">
                    {message}
                  </p>
                )}

              </div>

              {/* CONTINUE SHOPPING */}

              <button
                onClick={() =>
                  router.push("/products")
                }
                className="mt-5 w-full rounded-full border border-[#ded5cf] bg-white py-3.5 text-sm font-semibold tracking-wide text-[#444] transition duration-300 hover:border-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white"
              >
                ← Continue Shopping
              </button>

            </div>

          </div>

        )}

      </div>
    </main>
  );
}