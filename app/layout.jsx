export const metadata = {
  title: "Oracolo del Giorno",
  description: "Ogni giorno una frase unica generata dall'IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
