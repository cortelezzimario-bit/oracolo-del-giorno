export const metadata = {
  title: "Oracolo del Giorno",
  description: "Ogni giorno una frase ispirazionale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }}>
        {children}
      </body>
    </html>
  );
}
