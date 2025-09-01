export async function GET() {
  const oracoli = [
    "Oggi è un buon giorno per iniziare qualcosa di nuovo 🌞",
    "La pazienza è la chiave per aprire ogni porta 🔑",
    "Un incontro inatteso porterà fortuna 🍀",
    "Segui il tuo istinto, conosce la strada 🧭",
    "La tua energia attirerà cose positive ✨",
    "Nel silenzio della notte, ascolta il battito del tuo cuore; è lì che risiede la verità."
  ];

  // Scegli uno a caso
  const messaggio = oracoli[Math.floor(Math.random() * oracoli.length)];

  return new Response(JSON.stringify({ message: messaggio }), {
    headers: { "Content-Type": "application/json" },
  });
}
