"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const C = "rgba(200,185,255,";

// Palm outline path — centered in 120x185 viewBox
// Palm base: roughly x=22-98, y=100-160
// Fingers rise from y=100 up to ~y=20
const PALM_PATH = "M 38 160 C 28 158 22 150 22 140 L 22 118 C 22 110 28 104 36 104 L 36 68 C 36 62 40 58 46 58 C 52 58 56 62 56 68 L 56 72 L 58 40 C 58 34 62 30 68 30 C 74 30 78 34 78 40 L 78 72 L 80 50 C 80 44 84 40 90 40 C 96 40 100 44 100 50 L 100 72 L 102 62 C 102 56 106 52 112 52 C 118 52 122 56 122 62 L 120 82 C 120 90 116 96 108 100 L 98 104 L 98 140 C 98 150 92 158 82 160 Z";

// Thumb path
const THUMB_PATH = "M 36 104 C 36 104 30 98 24 88 C 18 78 18 68 24 62 C 30 56 40 58 44 66 C 48 74 46 86 40 96 Z";

// Palm ridge lines (horizontal curves across palm)
const PALM_RIDGES = [
  "M 36 114 Q 60 110 98 114",
  "M 35 122 Q 60 118 98 122",
  "M 35 130 Q 60 126 98 130",
  "M 35 138 Q 62 134 97 138",
  "M 38 146 Q 62 142 95 146",
  "M 42 153 Q 62 150 90 153",
];

// Finger ridge groups [finger center x, y top of ridges, count]
const FINGER_RIDGES: [number, number, number][] = [
  [46, 60, 4],  // index
  [68, 32, 4],  // middle
  [88, 42, 4],  // ring
  [110, 54, 4], // pinky
];

export function HandprintTerminal() {
  return (
    <TerminalWindow title="PALM" tag="BIO-002" delay={0.3} glisten>
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 130 185" width="100%" style={{ display: "block", maxWidth: "210px" }}>
          <defs>
            <filter id="hp-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="hp-scan" x="-100%" y="-900%" width="300%" height="2000%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="hp-fade" cx="50%" cy="60%" r="50%">
              <stop offset="0%"   stopColor="white" stopOpacity="1"  />
              <stop offset="65%"  stopColor="white" stopOpacity="0.9"/>
              <stop offset="85%"  stopColor="white" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"  />
            </radialGradient>
            <mask id="hp-mask">
              <rect x="5" y="5" width="120" height="175" rx="8" fill="url(#hp-fade)" />
            </mask>
          </defs>

          {/* Hand outline */}
          <g filter="url(#hp-glow)" mask="url(#hp-mask)">
            {/* Palm body */}
            <path
              d={PALM_PATH}
              fill="none"
              stroke={`${C}0.55)`}
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Thumb */}
            <path
              d={THUMB_PATH}
              fill="none"
              stroke={`${C}0.45)`}
              strokeWidth="1.0"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Palm ridges */}
            {PALM_RIDGES.map((d, i) => (
              <path key={i} d={d} fill="none"
                stroke={`${C}${(0.5 - i * 0.04).toFixed(2)})`}
                strokeWidth="0.7" strokeLinecap="round" />
            ))}

            {/* Finger ridges */}
            {FINGER_RIDGES.map(([cx, ty, count], fi) =>
              Array.from({ length: count }, (_, ri) => (
                <path key={`${fi}-${ri}`}
                  d={`M ${cx - 5} ${ty + ri * 6} Q ${cx} ${ty + ri * 6 - 2} ${cx + 5} ${ty + ri * 6}`}
                  fill="none"
                  stroke={`${C}0.38)`}
                  strokeWidth="0.6" strokeLinecap="round" />
              ))
            )}

            {/* Center palm marker */}
            <circle cx="65" cy="132" r="3" fill="none" stroke={`${C}0.4)`} strokeWidth="0.7" />
            <circle cx="65" cy="132" r="1" fill={`${C}0.6)`} />

            {/* Knuckle dots */}
            {[46, 68, 88, 110].map((x, i) => (
              <circle key={i} cx={x} cy={102} r="1.2" fill="none"
                stroke={`${C}0.35)`} strokeWidth="0.6" />
            ))}
          </g>

          {/* Scan line */}
          <motion.rect x="8" y="8" width="114" height="1.4"
            fill={`${C}0.85)`} filter="url(#hp-scan)" mask="url(#hp-mask)"
            animate={{ y: [8, 172, 8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.9 }}
          />
          <motion.rect x="8" y="2" width="114" height="12"
            fill={`${C}0.07)`} filter="url(#hp-scan)" mask="url(#hp-mask)"
            animate={{ y: [2, 163, 2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.9 }}
          />
        </svg>

        {/* Status readout */}
        <div className="w-full flex flex-col gap-1.5"
          style={{ borderTop: `1px solid ${C}0.18)`, paddingTop: "0.6rem" }}>
          {[
            { label: "STATUS",  value: "IDENTIFIED" },
            { label: "MATCH",   value: "94.2%"      },
            { label: "TYPE",    value: "RIGHT PALM"  },
            { label: "QUALITY", value: "HIGH"        },
          ].map(({ label, value }, i) => (
            <motion.div key={label} className="flex justify-between"
              initial={{ opacity: 0, x: -4 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.3 + i * 0.06 }}>
              <span style={{ fontSize: "0.78rem", letterSpacing: "0.15em",
                color: `${C}0.5)`, textTransform: "uppercase", fontFamily: "monospace" }}>
                {label}
              </span>
              <span style={{ fontSize: "0.78rem", letterSpacing: "0.12em",
                color: `${C}0.92)`, textTransform: "uppercase", fontFamily: "monospace" }}>
                {value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </TerminalWindow>
  );
}
