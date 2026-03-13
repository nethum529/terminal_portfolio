"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Flash {
  id: number;
  edge: "top" | "bottom" | "left" | "right";
  offset: number;
  size: number;
}

export function GlistenEffect() {
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const nextId = useRef(0);

  const scheduleNext = useCallback(() => {
    const delay = 2500 + Math.random() * 6000;
    return setTimeout(() => {
      const edges = ["top", "bottom", "left", "right"] as const;
      const flash: Flash = {
        id: nextId.current++,
        edge: edges[Math.floor(Math.random() * edges.length)],
        offset: 15 + Math.random() * 70,
        size: 18 + Math.random() * 22,
      };
      setFlashes(prev => [...prev, flash]);
      setTimeout(() => {
        setFlashes(prev => prev.filter(f => f.id !== flash.id));
      }, 280);
      scheduleNext();
    }, delay);
  }, []);

  useEffect(() => {
    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, [scheduleNext]);

  return (
    <>
      {flashes.map(({ id, edge, offset, size }) => {
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
        return <div key={id} aria-hidden="true" className="glisten-line" style={style} />;
      })}
    </>
  );
}
