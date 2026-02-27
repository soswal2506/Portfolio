import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TelemetryProvider } from "@/components/TelemetryProvider";
import { Cursor } from "@/components/Cursor";
import { Manrope, Sora } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Shubh Oswal — Data Engineer",
  description: "Portfolio + Kafka streaming telemetry showcase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <TelemetryProvider>
          <div className="noise" />
          <Cursor />
          <div className="min-h-screen">
            <Nav />
            <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10">
              {children}
            </main>
            <Footer />
          </div>
        </TelemetryProvider>
      </body>
    </html>
  );
}
