export async function GET() {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sei un oracolo misterioso. Genera una frase breve e profonda, in italiano, diversa ogni volta, come se fosse un consiglio o una profezia."
          },
          {
            role: "user",
            content: "Dammi l’oracolo del giorno."
          }
        ],
        max_tokens: 60,
        temperature: 0.9
      })
    });

    const data = await res.json();
    const oracolo = data.choices[0].message.content;

    return new Response(JSON.stringify({ message: oracolo }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store" // 🔥 evita che Vercel salvi la risposta
      }
    });
  } catch (error) {
    return Response.json({ message: "Errore nel generare l'oracolo 🌑" });
  }
}
