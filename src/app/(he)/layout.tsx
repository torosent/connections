import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { getEditionMetadata } from "@/i18n/translations";
import "../globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl-libre",
  subsets: ["hebrew", "latin"],
  weight: ["700"],
});

export const metadata: Metadata = getEditionMetadata("he");

export default function HebrewRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frankRuhlLibre.variable}`}>
      <body className="antialiased bg-gray-50">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
