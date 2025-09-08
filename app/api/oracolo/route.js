import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Logghiamo l’orario e l’ID richiesta per capire se arriva al server
    console.log("🔮 Richiesta ricevuta:", new Date().toISOString(), req.url);

    // Chiamata a OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Sei un oracolo misterioso. Genera SEMPRE una frase breve, profonda, unica e diversa ogni volta, in italiano, come se fosse un consiglio, predizione o profezia.",
          },
          {
            role: "user",
            content: "Dammi l’oracolo del giorno, cambia ogni richiesta.",
          },
        ],
        max_tokens: 60,
        temperature: 1.2,
        top_p: 1,
        presence_penalty: 0.8,
        frequency_penalty: 0.8,
      }),
    });

    const data = await response.json();
    const messaggio =
      data.choices?.[0]?.message?.content || "Silenzio dagli dei…";

    console.log("✨ Oracolo generato:", messaggio);

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
    console.error("❌ Errore OpenAI:", error);
    return NextResponse.json(
      { message: "Errore nella generazione dell’oracolo 🌑" },
      { status: 500 }
    );
  }
}
