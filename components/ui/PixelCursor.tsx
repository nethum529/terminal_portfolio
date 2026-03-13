"use client";

import { useEffect, useRef } from "react";

export function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let raf: number;
    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
    };

    const loop = () => {
      // Outer block follows with slight lag
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.transform = `translate(${curX - 8}px, ${curY - 8}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer pixel block — lags slightly */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          border: "1px solid rgba(255,255,255,0.7)",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          background: "#EAEAEA",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
    </>
  );
}
