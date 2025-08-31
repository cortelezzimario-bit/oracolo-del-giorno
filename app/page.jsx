"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [oracolo, setOracolo] = useState("Caricamento...");

  useEffect(() => {
    fetch("/api/oracolo")
      .then((res) => res.json())
      .then((data) => setOracolo(data.oracolo))
      .catch(() => setOracolo("Errore nel caricamento"));
  }, []);

  return (
    <main>
      <h1>Oracolo del Giorno</h1>
      <p style={{ fontSize: "1.5rem", marginTop: "20px" }}>{oracolo}</p>
    </main>
  );
}
