import OpenAI from "openai";

export async function GET() {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sei un oracolo che parla con frasi brevi, misteriose e ispirazionali." },
        { role: "user", content: "Dimmi l'oracolo di oggi." }
      ],
      max_tokens: 50,
    });

    const frase = completion.choices[0].message.content;
    return Response.json({ oracolo: frase });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
