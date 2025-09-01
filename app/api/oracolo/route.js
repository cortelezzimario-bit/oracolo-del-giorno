bimport { NextResponse } from "next/server";

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
            content: "Sei un oracolo misterioso. Genera una frase breve, profonda, unica e diversa ogni volta, in italiano, come un consiglio o una profezia.",
          },
          {
            role: "user",
            content: "Dammi l’oracolo del giorno, cambia ogni richiesta.",
          },
        ],
        max_tokens: 60,
        temperature: 1.2, // più creativo
        top_p: 1,
        presence_penalty: 0.8, // evita ripetizioni
        frequency_penalty: 0.8, // evita frasi già dette
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "Silenzio dagli dei…";

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: "Errore nella generazione dell’oracolo" }, { status: 500 });
  }
}
