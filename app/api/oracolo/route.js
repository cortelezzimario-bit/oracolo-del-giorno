body: JSON.stringify({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "Sei un oracolo misterioso. Genera una frase breve, profonda, unica e diversa ogni volta, in italiano, come un consiglio o una profezia."
    },
    {
      role: "user",
      content: "Dammi l’oracolo del giorno, cambia ogni richiesta."
    }
  ],
  max_tokens: 60,
  temperature: 1.2, // 🔥 aumenta la creatività
  top_p: 1,
  presence_penalty: 0.8, // evita ripetizioni
  frequency_penalty: 0.8 // evita frasi già dette
})
