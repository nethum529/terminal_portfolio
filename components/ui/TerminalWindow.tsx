"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { GlistenEffect } from "./GlistenEffect";

interface TerminalWindowProps {
  title: string;
  tag?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  glow?: boolean;
  glitch?: boolean;
  glisten?: boolean;
  bounce?: boolean;
}

export function TerminalWindow({
  title,
  tag,
  children,
  className = "",
  delay = 0,
  glow = false,
  glitch = false,
  glisten = false,
  bounce = false,
}: TerminalWindowProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!glitch) return;
    const schedule = () => {
      const wait = 5000 + Math.random() * 9000;
      timerRef.current = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          schedule();
        }, 240);
      }, wait);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [glitch]);

  const springTransition = {
    type: "spring" as const,
    stiffness: 90,
    damping: 14,
    delay,
  };
  const easeTransition = { duration: 0.38, delay, ease: "easeOut" as const };

  return (
    <motion.div
      className={[
        "t-panel overflow-hidden",
        glow ? "t-panel-glow" : "",
        isGlitching ? "panel-glitching" : "",
        className,
      ].join(" ")}
      initial={{ opacity: 0, y: bounce ? 14 : 7 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={bounce ? springTransition : easeTransition}
    >
      {/* Title bar */}
      <div className="t-header">
        <span className="t-dots">● ● ●</span>
        <span className="t-title">{title}</span>
        {tag && <span className="t-tag">{tag}</span>}
      </div>

      {/* Body */}
      <div className="t-body">{children}</div>

      {/* Edge glisten */}
      {glisten && <GlistenEffect />}
    </motion.div>
  );
}
