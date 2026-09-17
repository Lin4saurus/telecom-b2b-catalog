import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { CompareBar } from "./components/CompareBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telesev Group | Mayorista de Telecomunicaciones",
  description:
    "Telesev Group es un mayorista B2B de telecomunicaciones especializado en fibra óptica, redes GPON y equipamiento de marcas como Kontron, Iskratel y C-Data.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <CompareBar />
        <CookieConsent />
      </body>
    </html>
  );
}
