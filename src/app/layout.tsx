import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, VT323, Press_Start_2P, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const pixelFont = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: "400",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ABHINAV.DEV - Retro Portfolio",
  description: "A cyberpunk-style developer portfolio with neon effects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${vt323.variable} ${pixelFont.variable} ${pixelifySans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
