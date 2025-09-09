import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "it"; // default italiano

    console.log("🔮 Richiesta ricevuta in lingua:", lang);

    // Frasi di prompt per ogni lingua
    const prompts = {
      it: "Sei un oracolo misterioso. Genera SEMPRE una frase breve, profonda, unica e diversa ogni volta, in italiano. Deve emozionare subito e lasciare un segno positivo.",
      en: "You are a mysterious oracle. ALWAYS generate a short, profound, unique, and different phrase in English every time. It should quickly create emotion and leave a positive mark.",
      es: "Eres un oráculo misterioso. Genera SIEMPRE una frase breve, profunda, única y diferente en español cada vez. Debe emocionar de inmediato y dejar una huella positiva.",
      fr: "Tu es un oracle mystérieux. Génère TOUJOURS une phrase courte, profonde, unique et différente en français à chaque fois. Elle doit émouvoir immédiatement et laisser une trace positive.",
      de: "Du bist ein geheimnisvolles Orakel. Erzeuge IMMER einen kurzen, tiefgründigen, einzigartigen und jedes Mal anderen Satz auf Deutsch. Er soll sofort Emotionen wecken und positiv wirken.",
      ru: "Ты загадочный оракул. ВСЕГДА создавай короткую, глубокую, уникальную и каждый раз разную фразу на русском языке. Она должна сразу вызывать эмоции и оставлять положительный след.",
      zh: "你是一个神秘的神谕。每次都要用中文生成简短、深刻、独特且不同的句子。它应该立即激发情感并留下积极的印象。",
    };

    const systemPrompt = prompts[lang] || prompts.it;

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
          { role: "system", content: systemPrompt },
          { role: "user", content: "Genera un oracolo adesso." },
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
