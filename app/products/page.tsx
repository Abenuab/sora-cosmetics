"use client";
export default function Products() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 p-10">

      <h1 className="text-5xl font-bold text-center text-pink-600">
        Our Products
      </h1>


      <div className="grid md:grid-cols-3 gap-8 mt-12">

        <div className="rounded-3xl shadow-xl overflow-hidden">
          <img
            src="/images/cream.jpg"
            className="w-full h-80 object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold">
              Luxury Face Cream
            </h2>

            <p className="text-pink-600 text-xl mt-3">
              $25
            </p>

            <button
  onClick={() => {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        name: "Luxury Face Cream",
        price: 25,
        image: "/images/cream.jpg"
      })
    );

    alert("Added to Cart 🛒");
  }}
  className="mt-5 bg-pink-600 text-white px-6 py-3 rounded-full"
>
  Add To Cart
</button>
          </div>

        </div>

      </div>

    </main>
  );
}