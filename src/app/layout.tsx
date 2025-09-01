import type { Metadata } from "next";
import { 
  geistSans, 
  geistMono, 
  orbitron, 
  vt323, 
  pressStart2P as pixelFont, 
  pixelifySans 
} from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABHINAV.DEV - Retro Portfolio",
  description: "Portfolio of Abhinav",
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
