"use client";

import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#292725]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f3eee9] px-6 py-20 sm:py-24">

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d8b4aa]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#d8b4aa]/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#a4766b]">
            Sora Cosmetics
          </p>

          <h1
            className={`${cormorant.className} mt-5 text-6xl font-semibold italic leading-none text-[#292725] sm:text-7xl md:text-8xl`}
          >
            Contact Us
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#706963] sm:text-lg">
            We'd love to hear from you. Reach out to Sora Cosmetics
            whenever you need assistance or have a question.
          </p>

        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-6 py-16 sm:py-20">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-7 md:grid-cols-3">

            {/* PHONE */}
            <div className="group rounded-[28px] border border-[#e5dfda] bg-white p-8 text-center shadow-[0_8px_30px_rgba(40,35,30,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(40,35,30,0.10)]">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3e9e5] text-2xl transition duration-300 group-hover:bg-[#e6d0ca]">
                📞
              </div>

              <h2
                className={`${cormorant.className} mt-6 text-3xl font-semibold text-[#292725]`}
              >
                Phone
              </h2>

              <p className="mt-3 text-sm text-[#77706b]">
                Call us directly
              </p>

              <a
                href="tel:+251996012811"
                className="mt-3 block font-semibold text-[#a4766b] transition hover:text-[#7e554d]"
              >
                +251 996 012 811
              </a>

            </div>

            {/* EMAIL */}
            <div className="group rounded-[28px] border border-[#e5dfda] bg-white p-8 text-center shadow-[0_8px_30px_rgba(40,35,30,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(40,35,30,0.10)]">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3e9e5] text-2xl transition duration-300 group-hover:bg-[#e6d0ca]">
                📧
              </div>

              <h2
                className={`${cormorant.className} mt-6 text-3xl font-semibold text-[#292725]`}
              >
                Email
              </h2>

              <p className="mt-3 text-sm text-[#77706b]">
                Send us an email
              </p>

              <a
                href="mailto:info@soracosmetics.com"
                className="mt-3 block break-all font-semibold text-[#a4766b] transition hover:text-[#7e554d]"
              >
                info@soracosmetics.com
              </a>

            </div>

            {/* LOCATION */}
            <div className="group rounded-[28px] border border-[#e5dfda] bg-white p-8 text-center shadow-[0_8px_30px_rgba(40,35,30,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(40,35,30,0.10)]">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3e9e5] text-2xl transition duration-300 group-hover:bg-[#e6d0ca]">
                📍
              </div>

              <h2
                className={`${cormorant.className} mt-6 text-3xl font-semibold text-[#292725]`}
              >
                Location
              </h2>

              <p className="mt-3 text-sm text-[#77706b]">
                We're based in
              </p>

              <p className="mt-3 font-semibold text-[#a4766b]">
                Ethiopia
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* MESSAGE SECTION */}
      <section className="bg-[#f1ebe6] px-6 py-20">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-2xl text-[#a4766b]">
            ✦
          </span>

          <h2
            className={`${cormorant.className} mt-4 text-5xl font-semibold italic text-[#292725] sm:text-6xl`}
          >
            We're here for you.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#706963]">
            Whether you have a question about a product, an order,
            or simply want to learn more about Sora Cosmetics,
            don't hesitate to get in touch.
          </p>

          <a
            href="mailto:info@soracosmetics.com"
            className="mt-8 inline-flex rounded-full bg-[#292725] px-8 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#a4766b]"
          >
            Email Sora Cosmetics
          </a>

        </div>

      </section>

      {/* BOTTOM BRAND */}
      <section className="bg-[#292725] px-6 py-14 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d1aaa1]">
          Sora Cosmetics
        </p>

        <p
          className={`${cormorant.className} mt-3 text-3xl italic text-white`}
        >
          Beauty that feels like you.
        </p>

      </section>

    </main>
  );
}