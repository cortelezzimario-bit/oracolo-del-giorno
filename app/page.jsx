"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("Caricamento...");

  // Funzione per prendere il messaggio dall’API
  const fetchOracolo = async () => {
    try {
      const res = await fetch("/api/oracolo");
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Errore nel caricamento. Riprova.");
    }
  };

  // Carichiamo l’oracolo appena si apre il sito
  useEffect(() => {
    fetchOracolo();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🔮 Oracolo del Giorno</h1>

      <div className="bg-white text-black rounded-2xl shadow-xl p-6 max-w-md text-center">
        <p className="text-lg">{message}</p>
      </div>

      <button
        onClick={fetchOracolo}
        className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-800 rounded-xl shadow-md text-white"
      >
        Nuovo Oracolo ✨
      </button>
    </main>
  );
}
