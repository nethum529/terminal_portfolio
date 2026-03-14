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
        <div key={i} className="flex gap-3 text-lg leading-8">
          <span style={{ color: "#ffffff", userSelect: "none" }}>›</span>
          <span style={{ color: "#ffffff" }}>
            {text}
            {i === lineIdx && !done && showCursor && (
              <span className="cursor-blink" style={{ color: "#ffffff" }}>█</span>
            )}
          </span>
        </div>
      ))}
      {done && showCursor && (
        <div className="flex gap-3 text-lg leading-8">
          <span style={{ color: "#ffffff", userSelect: "none" }}>›</span>
          <span className="cursor-blink" style={{ color: "#ffffff" }}>█</span>
        </div>
      )}
    </div>
  );
}
