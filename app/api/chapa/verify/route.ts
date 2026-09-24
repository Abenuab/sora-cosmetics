import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {

    const { tx_ref } = await req.json();


    if (!tx_ref) {
      return NextResponse.json({
        error: "Missing transaction reference",
      });
    }


    const response = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );


    const data = await response.json();


    console.log("VERIFY RESPONSE:", data);



    if (data.status === "success") {


      const { error } = await supabase
        .from("orders")
        .update({
          payment_status: "Paid",
          status: "Confirmed",
        })
        .eq("tx_ref", tx_ref);



      if (error) {

        console.log("UPDATE ERROR:", error);

        return NextResponse.json({
          error: error.message,
        });

      }


      return NextResponse.json({
        success: true,
        message: "Payment verified",
      });

    }



    return NextResponse.json({
      success: false,
      message: "Payment not completed",
      data,
    });



  } catch (error) {


    console.log("VERIFY ERROR:", error);


    return NextResponse.json(
      {
        error: "Verification failed",
      },
      {
        status: 500,
      }
    );

  }
}