import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, email, first_name, phone, tx_ref } = body;

    console.log(
      "Secret key exists:",
      !!process.env.CHAPA_SECRET_KEY
    );

    console.log(
      "Secret key prefix:",
      process.env.CHAPA_SECRET_KEY?.substring(0, 12)
    );

console.log("Amount:", amount);
console.log("Type:", typeof amount);
    const response = await fetch(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: Number(amount),
          currency: "ETB",

          email: email,

          first_name: first_name,

          phone_number: phone,

          tx_ref: tx_ref,

          callback_url:
            "http://localhost:3000/api/chapa/verify",

          return_url:
            "http://localhost:3000/success",
        }),
      }
    );


    const data = await response.json();


    console.log("Chapa Response:", data);


    return NextResponse.json(data);


  } catch (error) {

    console.log("CHAPA ERROR:", error);


    return NextResponse.json(
      {
        error: "Payment initialization failed",
      },
      {
        status: 500,
      }
    );
  }
}