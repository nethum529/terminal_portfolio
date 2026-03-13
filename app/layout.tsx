import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "NETHUM.WEERASINGHE // SYS",
  description: "Developer portfolio — Nethum Weerasinghe, CS @ Texas A&M",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={shareTechMono.variable}>
        <div className="scanline" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
