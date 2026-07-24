"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";


type Product = {
  id:number | string;
  name:string;
  price:number;
  image:string;
  category?:string;
};


export default function Home(){

  const { addToCart } = useCart();

  const [products,setProducts] = useState<Product[]>([]);


  useEffect(()=>{

    loadProducts();

  },[]);



  async function loadProducts(){

    const {data,error}=await supabase
      .from("products")
      .select("*")
      .limit(4);


    if(!error && data){

      setProducts(data);

    }

  }



return (

<main className="
min-h-screen
bg-gradient-to-b
from-pink-50
via-white
to-pink-100
dark:from-gray-950
dark:via-gray-900
dark:to-black
">


{/* ================= PREMIUM HERO ================= */}

<section className="
relative
overflow-hidden
min-h-[90vh]
flex
items-center
">

{/* Background */}

<div className="
absolute
inset-0
bg-gradient-to-br
from-pink-100
via-white
to-purple-100
dark:from-gray-950
dark:via-gray-900
dark:to-black
">


</div>



<div className="
absolute
top-20
right-20
w-72
h-72
bg-pink-300
rounded-full
blur-3xl
opacity-30
animate-pulse
">


</div>



<div className="
absolute
bottom-10
left-20
w-60
h-60
bg-purple-300
rounded-full
blur-3xl
opacity-20
">


</div>





<div className="
relative
z-10
max-w-7xl
mx-auto
px-6
py-20
grid
lg:grid-cols-2
gap-16
items-center
">


{/* LEFT CONTENT */}


<div>


<div className="
inline-flex
items-center
gap-2
bg-white/70
dark:bg-gray-800/70
backdrop-blur
px-5
py-3
rounded-full
shadow-lg
text-pink-600
font-bold
">

✨ #1 Beauty Collection


</div>



<h1 className="
mt-8
text-5xl
lg:text-7xl
font-black
leading-tight
">


Reveal Your

<span className="
block
text-transparent
bg-clip-text
bg-gradient-to-r
from-pink-600
to-purple-600
">

Natural Beauty

</span>


With Sora ✨


</h1>




<p className="
mt-8
text-xl
leading-9
text-gray-600
dark:text-gray-300
max-w-xl
">

Premium skincare and cosmetics created
to enhance your confidence, beauty and
daily self-care routine.

</p>





<div className="
flex
flex-wrap
gap-5
mt-10
">


<Link

href="/products"

className="
bg-pink-600
hover:bg-pink-700
text-white
px-10
py-4
rounded-2xl
font-bold
shadow-xl
hover:scale-105
transition
"

>

Shop Collection 🛍️

</Link>



<Link

href="/cart"

className="
border-2
border-pink-600
text-pink-600
px-10
py-4
rounded-2xl
font-bold
hover:bg-pink-600
hover:text-white
transition
"

>

My Cart 🛒

</Link>


</div>





<div className="
grid
grid-cols-3
gap-6
mt-14
">


<div>

<h3 className="
text-3xl
font-black
text-pink-600
">

100+

</h3>

<p className="text-gray-500">
Happy Clients
</p>

</div>



<div>

<h3 className="
text-3xl
font-black
text-pink-600
">

50+

</h3>

<p className="text-gray-500">
Products
</p>

</div>



<div>

<h3 className="
text-3xl
font-black
text-pink-600
">

5★

</h3>

<p className="text-gray-500">
Reviews
</p>

</div>



</div>



</div>







{/* RIGHT IMAGE */}


<div className="
relative
flex
justify-center
">


<div className="
absolute
w-[420px]
h-[420px]
rounded-full
bg-gradient-to-r
from-pink-300
to-purple-300
blur-3xl
opacity-40
">


</div>



<div className="
relative
bg-white/40
dark:bg-gray-800/40
backdrop-blur-xl
p-6
rounded-[50px]
shadow-2xl
animate-bounce
[animation-duration:4s]
">


<Image

src="/images/cream.jpg"

alt="Sora Cosmetics"

width={550}

height={650}

priority

className="
rounded-[40px]
object-cover
shadow-2xl
"

/>


</div>



</div>


</div>


</section>
{/* ================= FEATURED PRODUCTS ================= */}

<section className="
max-w-7xl
mx-auto
px-6
py-20
">


<div className="text-center">

<h2 className="
text-4xl
font-bold
">

Featured Products ✨

</h2>


<p className="
text-gray-500
mt-4
text-lg
">

Our most loved beauty products

</p>


</div>



<div className="
grid
md:grid-cols-4
gap-8
mt-12
">


{
products.map((product)=>(


<div
key={product.id}
className="
bg-white
dark:bg-gray-900
rounded-3xl
shadow-xl
overflow-hidden
hover:-translate-y-2
transition
"
>


<img

src={product.image}

alt={product.name}

className="
w-full
h-72
object-cover
"

/>


<div className="p-6">


<h3 className="
text-xl
font-bold
">

{product.name}

</h3>



<p className="
text-pink-600
font-bold
text-2xl
mt-3
">

${product.price}

</p>



<button

onClick={()=>addToCart({

...product,

quantity:1

})}

className="
mt-5
w-full
bg-pink-600
text-white
py-3
rounded-xl
hover:bg-pink-700
transition
"

>

Add To Cart 🛒

</button>


</div>


</div>


))

}


</div>


<Link

href="/products"

className="
block
text-center
mt-12
text-pink-600
font-bold
text-xl
"

>

View All Products →

</Link>


</section>






{/* ================= BEAUTY GALLERY ================= */}


<section className="
bg-white
dark:bg-gray-950
py-20
">


<div className="
max-w-7xl
mx-auto
px-6
">


<h2 className="
text-4xl
font-bold
text-center
">

Beauty Gallery 📸

</h2>



<div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
mt-12
">


{

[

"/images/2.jpg",

"/images/3.jpg",

"/images/4.jpg",

"/images/cream.jpg"

].map((img)=>(


<div
key={img}
className="
overflow-hidden
rounded-3xl
shadow-xl
"
>


<img

src={img}

alt="Beauty"

className="
w-full
h-64
object-cover
hover:scale-110
transition
duration-500
"

/>


</div>


))


}


</div>


</div>


</section>






{/* ================= WHY SORA ================= */}


<section className="
max-w-7xl
mx-auto
px-6
py-20
">


<div className="
grid
md:grid-cols-4
gap-8
">


{

[

["🚚","Fast Delivery","Quick and reliable delivery"],

["🔒","Secure Payment","Safe Chapa checkout"],

["🌿","Premium Quality","Carefully selected products"],

["⭐","Trusted Brand","Customer satisfaction"]

].map((item)=>(


<div

key={item[1]}

className="
bg-pink-600
text-white
rounded-3xl
p-8
text-center
shadow-xl
"


>


<div className="text-5xl">
{item[0]}
</div>


<h3 className="
text-xl
font-bold
mt-4
">

{item[1]}

</h3>


<p className="
mt-3
text-pink-100
">

{item[2]}

</p>


</div>


))


}


</div>


</section>






{/* ================= TESTIMONIAL ================= */}


<section className="
bg-pink-50
dark:bg-gray-900
py-20
">


<div className="
max-w-6xl
mx-auto
px-6
">


<h2 className="
text-4xl
font-bold
text-center
">

Customer Love 💖

</h2>



<div className="
grid
md:grid-cols-3
gap-8
mt-12
">


{

[

"Beautiful products and amazing quality ⭐⭐⭐⭐⭐",

"Fast delivery and excellent service ⭐⭐⭐⭐⭐",

"My favorite cosmetics store ⭐⭐⭐⭐⭐"

].map((review)=>(


<div

key={review}

className="
bg-white
dark:bg-gray-800
p-8
rounded-3xl
shadow-xl
text-center
"


>

<p className="
text-lg
">

{review}

</p>


</div>


))


}


</div>


</div>


</section>






{/* ================= NEWSLETTER ================= */}


<section className="
max-w-5xl
mx-auto
px-6
py-20
text-center
">


<h2 className="
text-4xl
font-bold
">

Stay Beautiful With Sora ✨

</h2>


<p className="
mt-4
text-gray-500
">

Get updates about new products and offers.

</p>



<div className="
flex
flex-col
md:flex-row
gap-4
mt-8
justify-center
">


<input

placeholder="Your email"

className="
border
p-4
rounded-xl
md:w-96
"

/>



<button

className="
bg-pink-600
text-white
px-8
rounded-xl
font-bold
"

>

Subscribe

</button>


</div>


</section>





</main>

);

}