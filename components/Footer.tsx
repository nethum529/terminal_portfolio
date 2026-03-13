const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      className="py-3 mt-2"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-3xl mx-auto px-3 flex items-center justify-between">
        <span className="mono-label">NETHUM.WEERASINGHE</span>
        <span className="mono-label-dim" suppressHydrationWarning>{YEAR}</span>
      </div>
    </footer>
  );
}
