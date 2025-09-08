import { NextResponse } from "next/server";

export async function GET() {
  try {
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
              "Sei un oracolo misterioso. Ogni volta che vieni interrogato, genera UNA frase breve, incisiva, poetica ed emozionante, diversa da tutte le precedenti. Scrivi in italiano. Pochi secondi di lettura, ma che lasciano un segno.",
          },
          {
            role: "user",
            content: "Dammi un oracolo unico e diverso.",
          },
        ],
        max_tokens: 60,
        temperature: 1.3, // più alto = più creativo
        top_p: 1,
        presence_penalty: 1.0, // evita ripetizioni
        frequency_penalty: 1.0,
      }),
    });

    const data = await response.json();
    const messaggio =
      data.choices?.[0]?.message?.content?.trim() || "Silenzio dagli dei…";

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
