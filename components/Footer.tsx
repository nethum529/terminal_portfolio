"use client";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-4 mt-4">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <span className="mono-label">NETHUM.WEERASINGHE</span>
        <span className="mono-label" suppressHydrationWarning>{YEAR}</span>
      </div>
    </footer>
  );
}
