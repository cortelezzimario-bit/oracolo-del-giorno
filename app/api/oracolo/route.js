import { NextResponse } from "next/server";

export async function GET() {
  try {
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
            content: `
              Sei l'Oracolo Antico.
              Ogni volta che ti viene chiesto, pronunci una profezia breve e unica.
              Le tue parole devono sembrare scolpite nel tempo: misteriose, intense, poetiche.
              Usa al massimo 15 parole.
              Evita frasi comuni: ogni oracolo deve emozionare, sorprendere, restare impresso nella memoria.
              Scrivi SEMPRE in italiano.
            `,
          },
          {
            role: "user",
            content: "Dammi un oracolo.",
          },
        ],
        max_tokens: 60,
        temperature: 1.3,
        top_p: 1,
        presence_penalty: 1,
        frequency_penalty: 1,
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
