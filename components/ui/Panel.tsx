"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface PanelProps {
  title?: string;
  tag?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: boolean;
}

export function Panel({
  title,
  tag,
  children,
  className = "",
  delay = 0,
  tilt = true,
}: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`panel ${className}`}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{
        boxShadow: "0 8px 40px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.14)",
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      {title && (
        <div className="panel-header flex items-center justify-between">
          <span className="label-bright">{title}</span>
          {tag && <span className="label">[{tag}]</span>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
