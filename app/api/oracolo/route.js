export async function GET() {
  const oracoli = [
    "Oggi è un buon giorno per iniziare qualcosa di nuovo 🌞",
    "La pazienza è la chiave che apre tutte le porte 🔑",
    "Nel silenzio scoprirai la tua vera forza 🌌",
    "Un piccolo passo oggi, un grande cambiamento domani 🚀",
    "Sorridi: il mondo ti risponderà con la stessa energia ✨",
    "Il coraggio non è non avere paura, ma andare avanti nonostante essa 🦁",
    "Ogni fine è solo un nuovo inizio 🌱"
  ];

  // Prende un oracolo a caso
  const random = Math.floor(Math.random() * oracoli.length);
  const messaggio = oracoli[random];

  return new Response(
    JSON.stringify({ message: messaggio }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200
    }
  );
}
