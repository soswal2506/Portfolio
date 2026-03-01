import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TelemetryProvider } from "@/components/TelemetryProvider";
import { Cursor } from "@/components/Cursor";
import { ChatbotDrawer } from "@/components/ChatbotDrawer";
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
  title: "Shubh Oswal - Data Engineer",
  description: "Portfolio + Kafka streaming telemetry showcase",
  openGraph: {
    title: "Shubh Oswal - Data Engineer",
    description: "Portfolio + Kafka streaming telemetry showcase",
    type: "website",
    images: [
      {
        url: "/linkedin-thumbnail-shubh.png",
        width: 1200,
        height: 627,
        alt: "Shubh Oswal portfolio thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubh Oswal - Data Engineer",
    description: "Portfolio + Kafka streaming telemetry showcase",
    images: ["/linkedin-thumbnail-shubh.png"],
  },
};

const themeScript = `
(() => {
  const key = "portfolio-theme";
  const stored = localStorage.getItem(key);
  const theme = stored === "light" || stored === "dark"
    ? stored
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${manrope.variable} ${sora.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Suspense fallback={null}>
          <TelemetryProvider />
        </Suspense>
        <div className="ambient-orbs" aria-hidden="true">
          <span className="ambient-orb orb-1" />
          <span className="ambient-orb orb-2" />
          <span className="ambient-orb orb-3" />
        </div>
        <div className="noise" />
        <Cursor />
        <div className="min-h-screen">
          <Nav />
          <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10">
            {children}
          </main>
          <ChatbotDrawer />
          <Footer />
        </div>
      </body>
    </html>
  );
}
