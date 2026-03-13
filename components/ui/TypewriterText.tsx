"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypewriterText({
  lines,
  speed = 28,
  lineDelay = 220,
  onComplete,
  showCursor = true,
}: TypewriterTextProps) {
  const [revealed, setRevealed] = useState<string[]>([]);
  const [lineIdx, setLineIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [done, setDone]         = useState(false);
  const completedRef             = useRef(false);

  useEffect(() => {
    if (completedRef.current) return;
    if (lineIdx >= lines.length) {
      completedRef.current = true;
      setDone(true);
      onComplete?.();
      return;
    }

    const line = lines[lineIdx];

    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setRevealed(prev => {
          const next = [...prev];
          next[lineIdx] = (next[lineIdx] ?? "") + line[charIdx];
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed, lineDelay, onComplete]);

  return (
    <div className="space-y-0.5">
      {revealed.map((text, i) => (
        <div key={i} className="flex gap-2 text-xs leading-5">
          <span style={{ color: "#3a3a3a", userSelect: "none" }}>›</span>
          <span style={{ color: "#8a8a8a" }}>
            {text}
            {i === lineIdx && !done && showCursor && (
              <span className="cursor-blink" style={{ color: "#C8C8C8" }}>█</span>
            )}
          </span>
        </div>
      ))}
      {done && showCursor && (
        <div className="flex gap-2 text-xs leading-5">
          <span style={{ color: "#3a3a3a", userSelect: "none" }}>›</span>
          <span className="cursor-blink" style={{ color: "#555" }}>█</span>
        </div>
      )}
    </div>
  );
}
