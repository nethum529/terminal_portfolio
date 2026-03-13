import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { StarField } from "@/components/ui/StarField";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
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
      <body className={ibmPlexMono.variable}>
        <StarField />
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
