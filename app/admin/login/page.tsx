"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function AdminLoginPage(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const login = async()=>{


    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });



    if(error){

      alert(error.message);
      return;

    }


    router.push("/admin/products");


  };



  return (

    <main className="min-h-screen flex items-center justify-center p-6">


      <div className="w-full max-w-md shadow-xl rounded-2xl p-8">


        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Admin Login
        </h1>


        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />


        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />


        <button
          onClick={login}
          className="w-full bg-pink-600 text-white p-3 rounded-xl"
        >
          Login
        </button>


      </div>


    </main>

  );

}