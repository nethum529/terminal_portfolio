"use client";

import { useEffect, useRef } from "react";

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Seed-based positions so re-renders look identical
    const seed = 42;
    let s = seed;
    const rand = () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };

    for (let i = 0; i < 220; i++) {
      const x = rand() * canvas.width;
      const y = rand() * canvas.height;
      const size = rand() < 0.85 ? 0.5 : 1;
      const opacity = rand() * 0.3 + 0.04;
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
