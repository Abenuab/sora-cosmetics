import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { tx_ref, order_id } = await req.json();

    const response = await fetch(
      'https://api.chapa.co/v1/transaction/verify/${tx_ref}',
      {
        method: "GET",
        headers: {
          Authorization: 'Bearer ${process.env.CHAPA_SECRET_KEY}',
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {

      const { error } = await supabase
        .from("orders")
        .update({
          payment_status: "Paid",
          status: "Confirmed",
        })
        .eq("id", order_id);


      if (error) {
        return NextResponse.json({
          error: error.message,
        });
      }


      return NextResponse.json({
        success: true,
        data,
      });

    }


    return NextResponse.json({
      success: false,
      data,
    });


  } catch (error) {

    return NextResponse.json({
      error: "Verification failed",
    });

  }
}