import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Chiamata all'API di OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // usa la chiave da Vercel
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Sei un oracolo misterioso. Genera SEMPRE una frase breve, profonda, unica e diversa ogni volta, in italiano. Deve sembrare un consiglio, una predizione o una profezia.",
          },
          {
            role: "user",
            content: "Dammi un oracolo unico e diverso.",
          },
        ],
        max_tokens: 60,
        temperature: 1.2,       // aumenta la creatività
        presence_penalty: 0.8,  // spinge a variare gli argomenti
        frequency_penalty: 0.8, // riduce ripetizioni
      }),
    });

    const data = await response.json();
    const messaggio =
      data.choices?.[0]?.message?.content?.trim() ||
      "Silenzio dagli dei…";

    return NextResponse.json(
      { message: messaggio },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Errore OpenAI:", error);
    return NextResponse.json(
      { message: "Errore nella generazione dell’oracolo 🌑" },
      { status: 500 }
    );
  }
}
