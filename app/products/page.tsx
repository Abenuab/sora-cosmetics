"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category: string;
};
export default function Products() {

  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");


  useEffect(() => {
    getProducts();
  }, []);


  async function getProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .limit(100);


    if (error) {

      console.error(error.message);
      return;

    }


    setProducts(data || []);

  }



  const categories = [

    "All",

    ...Array.from(
      new Set(
        products.map(
          (product) => product.category
        )
      )
    ),

  ];



  const filteredProducts = products.filter((product)=>{


    const matchSearch =
      product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );


    const matchCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;


    return matchSearch && matchCategory;


  });



  return (

    <main className="min-h-screen bg-white dark:bg-gray-950 p-10">


      <h1 className="text-5xl font-bold text-center text-pink-600">

        Premium Beauty Products

      </h1>


      <p className="text-center text-gray-500 mt-4">

        Shop skincare, makeup and beauty products from Sora Cosmetics.

      </p>




      <div className="flex flex-col md:flex-row gap-4 mt-10 mb-10">


        <input

          type="text"

          placeholder="Search beauty products..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="border p-3 rounded-xl flex-1"

        />



        <select

          value={selectedCategory}

          onChange={(e)=>setSelectedCategory(e.target.value)}

          className="border p-3 rounded-xl"

        >


          {categories.map((cat)=>(

            <option key={cat}>

              {cat}

            </option>

          ))}


        </select>


      </div>






      <div className="grid md:grid-cols-3 gap-8 mt-12">



        {
          filteredProducts.length === 0 ? (


            <p className="text-center text-gray-500 col-span-3">

              No products found

            </p>



          ) : (


            filteredProducts.map((product)=>(


              <div

                key={product.id}

                className="rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-gray-900"

              >



                <img

                  src={product.image}

                  alt={`${product.name} - Sora Cosmetics beauty product`}

                  loading="lazy"

                  className="w-full h-80 object-cover"

                />





                <div className="p-6">



                  <h2 className="text-2xl font-bold">

                    {product.name}

                  </h2>




                  <p className="text-gray-500">

                    {product.category}

                  </p>




                  <p className="text-gray-600 mt-3">

                    Premium quality {product.category} product from Sora Cosmetics.

                  </p>





                  <p className="text-pink-600 text-xl mt-3 font-bold">

                    ${product.price}

                  </p>




<button
  onClick={() => {

    console.log("ADDING:", product);

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      category: product.category,
      quantity: 1,
    });

  }}
  className="mt-5 w-full bg-pink-600 text-white py-3 rounded-xl"
>
  Add to Cart
</button>


                </div>



              </div>



            ))

          )

        }



      </div>



    </main>

  );

}