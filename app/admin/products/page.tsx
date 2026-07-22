"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};


export default function AdminProductsPage() {
const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


 useEffect(() => {
  checkUser();
}, []);

const checkUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first.");
    router.push("/login");
    return;
  }


  if (user.email !== "abenuab20@gmail.com") {
    alert("You are not allowed to access admin page.");
    router.push("/");
    return;
  }


  fetchProducts();
};


  const fetchProducts = async () => {
 
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", {
        ascending: false,
      });


    if (error) {
      alert(error.message);
      return;
    }


    setProducts(data || []);

  };

const uploadImage = async () => {
  if (!imageFile) return null;

  const fileName = Date.now() + "-" + imageFile.name;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, imageFile);

  if (error) {
    alert(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

  const addProduct = async () => {

const imageUrl = await uploadImage();
    const { error } = await supabase
      .from("products")
     .insert([
  {
 name,
 price: Number(price),
 image: imageUrl,
 category,
}
])



    if (error) {
      alert(error.message);
      return;
    }



    alert("Product added successfully");

    clearForm();

    fetchProducts();

  };

const categories = [
  "All",
  ...Array.from(
    new Set(products.map((p) => p.category))
  ),
];

const filteredProducts = products.filter((product) => {
  return (
    product.name
      .toLowerCase()
      .includes(search.toLowerCase()) &&
    (
      selectedCategory === "All" ||
      product.category === selectedCategory
    )
  );
});



  const updateProduct = async () => {


    if (!editId) return;



    const { error } = await supabase
      .from("products")
      .update({
  name,
  price: Number(price),
  image,
  category,
})
      .eq("id", editId);



    if (error) {
      alert(error.message);
      return;
    }



    alert("Product updated successfully");


    clearForm();

    fetchProducts();

  };






  const deleteProduct = async (id:number) => {


    const confirmDelete = confirm(
      "Delete this product?"
    );


    if (!confirmDelete) return;




    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);




    if (error) {
      alert(error.message);
      return;
    }




    fetchProducts();

  };

const editProduct = (product: Product) => {
  console.log("EDIT:", product);

  setEditId(product.id);
  setName(product.name ?? "");
  setPrice(String(product.price ?? ""));
  setImage(product.image ?? "");
  setCategory(product.category ?? "");
};
  const clearForm = () => {

    setEditId(null);

    setName("");

    setPrice("");

    setImage("");

    setCategory("");

  };
  return (

    <div className="p-8">


      <h1 className="text-3xl font-bold mb-8">
        Manage Products 🛍️
      </h1>
<div className="flex flex-col md:flex-row gap-4 mb-8">

<input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  className="border p-3 rounded-xl flex-1"
/>


<select
  value={selectedCategory}
  onChange={(e)=>setSelectedCategory(e.target.value)}
  className="border p-3 rounded-xl"
>

{
 categories.map((cat)=>(
   <option key={cat}>
     {cat}
   </option>
 ))
}

</select>

</div>
      <div className="max-w-xl mb-10">
        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Product name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
       <input
  type="file"
  accept="image/*"
  className="w-full border p-3 rounded mb-3"
  onChange={(e)=>
    setImageFile(
      e.target.files?.[0] || null
    )
  }
/>
        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <button

          onClick={
            editId
            ? updateProduct
            : addProduct
          }

          className="w-full bg-pink-600 text-white p-3 rounded-xl"
        >

          {
            editId
            ? "Update Product"
            : "Add Product"
          }

        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {
          filteredProducts.map((product)=>(

            <div

              key={product.id}

              className="shadow-xl rounded-2xl overflow-hidden p-4"

            >

              <img
  src={product.image}
  alt={product.name}
  className="h-48 w-full object-cover rounded-xl"
/>

<h2 className="text-xl font-bold mt-3">
  {product.name}
</h2>

<p>
  ${product.price}
</p>

<p className="text-gray-500">
  {product.category}
</p>
              <button

                onClick={() =>
                  editProduct(product)
                }

                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl"

              >

                Edit

              </button>

              <button

                onClick={() =>
                  deleteProduct(product.id)
                }

                className="mt-3 w-full bg-red-600 text-white py-2 rounded-xl"

              >

                Delete

              </button>

            </div>


          ))
        }



      </div>



    </div>

  );

}