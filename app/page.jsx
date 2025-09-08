"use client";
import { useState } from "react";

export default function Home() {
  const [oracolo, setOracolo] = useState("Premi il pulsante per ricevere un oracolo ✨");
  const [loading, setLoading] = useState(false);

  const getOracolo = async () => {
    setLoading(true);
    try {
      // Chiamata API senza cache
      const res = await fetch("/api/oracolo", {
        method: "GET",
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      const data = await res.json();
      setOracolo(data.message);
      console.log("Nuovo oracolo:", data.message);
    } catch (err) {
      setOracolo("Errore nel contattare l’oracolo 🌑");
      console.error("Errore client:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Oracolo del Giorno 🔮</h1>
      <p className="text-xl mb-6 text-center">{oracolo}</p>
      <button
        onClick={getOracolo}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Sto consultando l’oracolo..." : "Chiedi un nuovo oracolo"}
      </button>
    </main>
  );
}
