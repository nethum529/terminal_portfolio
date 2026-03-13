import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NETHUM.WEERASINGHE // SYS",
  description: "Developer portfolio — Nethum Weerasinghe, CS @ Texas A&M",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="scanline" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
