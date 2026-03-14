"use client";

import { useState, useEffect, useRef } from "react";

interface LoopingTypewriterProps {
  text: string;
  speed?: number;
  eraseSpeed?: number;
  pause?: number;
}

export function LoopingTypewriter({
  text,
  speed = 38,
  eraseSpeed = 14,
  pause = 3200,
}: LoopingTypewriterProps) {
  const [chars, setChars] = useState(0);
  const phase = useRef<"typing" | "pausing" | "erasing">("typing");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      if (phase.current === "typing") {
        setChars(c => {
          const next = c + 1;
          if (next >= text.length) {
            phase.current = "pausing";
            timer.current = setTimeout(() => {
              phase.current = "erasing";
              tick();
            }, pause);
            return next;
          }
          timer.current = setTimeout(tick, speed);
          return next;
        });
      } else if (phase.current === "erasing") {
        setChars(c => {
          const next = c - 1;
          if (next <= 0) {
            phase.current = "typing";
            timer.current = setTimeout(tick, speed * 4);
            return 0;
          }
          timer.current = setTimeout(tick, eraseSpeed);
          return next;
        });
      }
    };

    // Small initial delay before first character
    timer.current = setTimeout(tick, 400);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, speed, eraseSpeed, pause]);

  return (
    <span>
      <span style={{ color: "#ffffff" }}>{text.slice(0, chars)}</span>
    </span>
  );
}
