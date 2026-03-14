"use client";

import { useState, useEffect, useRef } from "react";

interface Flash {
  id: number;
  edge: "top" | "bottom" | "left" | "right";
  offset: number;
  size: number;
}

const EDGES = ["top", "bottom", "left", "right"] as const;

export function GlistenEffect() {
  const [flash, setFlash] = useState<Flash | null>(null);
  const nextId = useRef(0);
  const outerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const innerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function schedule() {
      outerTimer.current = setTimeout(() => {
        const f: Flash = {
          id: nextId.current++,
          edge: EDGES[Math.floor(Math.random() * EDGES.length)],
          offset: 15 + Math.random() * 70,
          size: 18 + Math.random() * 22,
        };
        setFlash(f);
        innerTimer.current = setTimeout(() => {
          setFlash(null);
          schedule();
        }, 280);
      }, 3000 + Math.random() * 6000);
    }

    schedule();
    return () => {
      if (outerTimer.current) clearTimeout(outerTimer.current);
      if (innerTimer.current) clearTimeout(innerTimer.current);
    };
  }, []);

  if (!flash) return null;

  const { edge, offset, size } = flash;
  const horiz = edge === "top" || edge === "bottom";
  const style: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 20,
    background: "rgba(255,255,255,0.7)",
    boxShadow: "0 0 5px rgba(255,255,255,0.45)",
    ...(horiz
      ? { [edge]: -1, left: `${offset}%`, width: size, height: 1, transform: "translateX(-50%)" }
      : { [edge]: -1, top: `${offset}%`, width: 1, height: size, transform: "translateY(-50%)" }),
  };

  return <div key={flash.id} aria-hidden="true" className="glisten-line" style={style} />;
}
