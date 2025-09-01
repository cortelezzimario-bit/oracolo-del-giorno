"use client";
import { useState } from "react";

export default function Home() {
  const [oracolo, setOracolo] = useState("Clicca il bottone per ricevere l’oracolo ✨");
  const [loading, setLoading] = useState(false);

  const getOracolo = async () => {
    try {
      setLoading(true);
      // aggiungo un parametro random per evitare cache
      const res = await fetch(`/api/oracolo?_=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Errore HTTP: ${res.status}`);
      }
      const data = await res.json();
      setOracolo(data.message);
      console.log("Nuovo oracolo:", data.message);
    } catch (err) {
      console.error("Errore API:", err);
      setOracolo("Errore nel contattare l’oracolo 🌑");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-6">🔮 Oracolo del Giorno</h1>
      <p className="text-xl mb-6 text-center max-w-xl">{oracolo}</p>
      <button
        onClick={getOracolo}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold transition"
      >
        {loading ? "Sto consultando gli Dei..." : "Chiedi un nuovo Oracolo"}
      </button>
    </main>
  );
}
