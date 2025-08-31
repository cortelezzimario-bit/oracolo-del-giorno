import { NextResponse } from "next/server";

export async function GET() {
  // Questa è una risposta di test, poi ci colleghiamo a OpenAI
  return NextResponse.json({
    message: "Oggi è un buon giorno per iniziare qualcosa di nuovo 🌞",
  });
}
