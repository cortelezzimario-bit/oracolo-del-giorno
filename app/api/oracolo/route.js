import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Chiamata al modello OpenAI GPT
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 🔑 chiave da Vercel
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // modello veloce ed economico
        messages: [
          {
            role: "system",
            content:
              "Sei un oracolo misterioso. Genera ogni volta una frase breve, profonda, unica e diversa in italiano, come predizione, consiglio o profezia. Non ripetere mai le stesse frasi.",
          },
          {
            role: "user",
            content: "Dammi l’oracolo del giorno, diverso ad ogni richiesta.",
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

    return NextResponse.json(
      { message: messaggio },
      {
        headers: { "Cache-Control": "no-store" }, // evita cache
      }
    );
  } catch (error) {
    console.error("Errore API:", error);
    return NextResponse.json(
      { message: "Errore nella generazione dell’oracolo 🌑" },
      { status: 500 }
    );
  }
}
