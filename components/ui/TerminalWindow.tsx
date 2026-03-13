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
  float?: boolean;
  floatDuration?: number;
  floatDelay?: number;
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
  float = false,
  floatDuration = 4,
  floatDelay = 0,
}: TerminalWindowProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!glitch) return;
    const schedule = () => {
      const wait = 5000 + Math.random() * 9000;
      timerRef.current = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => { setIsGlitching(false); schedule(); }, 280);
      }, wait);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [glitch]);

  const panel = (
    <motion.div
      className={[
        "t-panel overflow-hidden",
        glow ? "t-panel-glow" : "",
        isGlitching ? "panel-glitching" : "",
        className,
      ].filter(Boolean).join(" ")}
      initial={{ opacity: 0, y: bounce ? 16 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        bounce
          ? { type: "spring", stiffness: 88, damping: 14, delay }
          : { duration: 0.38, delay, ease: "easeOut" }
      }
    >
      <div className="t-header">
        <span className="t-dots">● ● ●</span>
        <span className="t-title">{title}</span>
        {tag && <span className="t-tag">{tag}</span>}
      </div>
      <div className="t-body">{children}</div>
      {glisten && <GlistenEffect />}
    </motion.div>
  );

  if (!float) return panel;

  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      {panel}
    </motion.div>
  );
}
