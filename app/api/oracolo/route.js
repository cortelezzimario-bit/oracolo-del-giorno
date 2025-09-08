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
            content:
              "Sei un oracolo positivo e motivante. Genera SEMPRE una frase breve (massimo 20 parole), in italiano, semplice da capire, che provochi subito emozioni positive. La frase deve ispirare fiducia, serenità e coraggio, con consigli pratici o incoraggianti per affrontare la giornata con leggerezza e ottimismo."
          },
          {
            role: "user",
            content: "Dammi un oracolo motivante e diverso ogni volta."
          }
        ],
        max_tokens: 60,
        temperature: 1.3,
        top_p: 1,
        presence_penalty: 0.9,
        frequency_penalty: 0.9,
      }),
    });

    const data = await response.json();

    // Log utile su Vercel
    console.log("Risposta OpenAI:", JSON.stringify(data, null, 2));

    const messaggio =
      data.choices?.[0]?.message?.content || "Oggi trova forza dentro di te 🌞";

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
