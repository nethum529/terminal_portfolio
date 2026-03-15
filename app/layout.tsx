import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Pixelify_Sans } from "next/font/google";
import { StarField } from "@/components/ui/StarField";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "NETHUM'S PORTFOLIO",
  description: "Developer portfolio — Nethum Weerasinghe, CS @ Texas A&M",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={pixelifySans.variable}>
        {/* Background stack: ethereal shadow → dark overlay → atmo cast → stars → grain → vignette → scanlines */}
        <div className="film-bg" aria-hidden="true">
          <EtheralShadow
            color="rgba(118, 111, 125, 1)"
            noise={{ opacity: 0.3, scale: 1.2 }}
            sizing="fill"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="film-overlay" aria-hidden="true" />
        <div className="atmo-overlay" aria-hidden="true" />
        <StarField />
        <div className="vignette" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <SmoothScroll />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
