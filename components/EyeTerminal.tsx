"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const C = "rgba(200,185,255,";
const CX = 60, CY = 85;
const IRIS_R = 32;
const PUPIL_R = 7;
const NUM_FIBERS = 24;

// Radial iris fiber lines
const FIBERS = Array.from({ length: NUM_FIBERS }, (_, i) => {
  const angle = (i / NUM_FIBERS) * 2 * Math.PI;
  const x1 = CX + (PUPIL_R + 1) * Math.cos(angle);
  const y1 = CY + (PUPIL_R + 1) * Math.sin(angle);
  const x2 = CX + (IRIS_R - 1) * Math.cos(angle);
  const y2 = CY + (IRIS_R - 1) * Math.sin(angle);
  return { x1, y1, x2, y2 };
});

// Concentric iris rings
const IRIS_RINGS = [
  { r: 10, op: 0.7, sw: 0.8 },
  { r: 14, op: 0.6, sw: 0.7 },
  { r: 18, op: 0.55, sw: 0.65 },
  { r: 22, op: 0.5, sw: 0.6 },
  { r: 27, op: 0.45, sw: 0.55 },
  { r: 31, op: 0.4, sw: 0.5 },
];

export function EyeTerminal() {
  return (
    <TerminalWindow title="IRIS" tag="BIO-003" delay={0.4} glisten>
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 120 185" width="100%" style={{ display: "block", maxWidth: "210px" }}>
          <defs>
            <filter id="eye-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.0" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="eye-scan" x="-100%" y="-900%" width="300%" height="2000%">
              <feGaussianBlur stdDeviation="3.0" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="eye-outer-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="eye-fade" cx="50%" cy="46%" r="42%">
              <stop offset="0%"   stopColor="white" stopOpacity="1"  />
              <stop offset="70%"  stopColor="white" stopOpacity="0.95"/>
              <stop offset="88%"  stopColor="white" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"  />
            </radialGradient>
            <mask id="eye-iris-mask">
              <circle cx={CX} cy={CY} r={IRIS_R + 2} fill="white" />
            </mask>
            <mask id="eye-shape-mask">
              <ellipse cx={CX} cy={CY} rx="46" ry="28" fill="url(#eye-fade)" />
            </mask>
            {/* Clip to eye almond shape */}
            <clipPath id="eye-clip">
              <path d={`M ${CX - 45} ${CY} Q ${CX} ${CY - 30} ${CX + 45} ${CY} Q ${CX} ${CY + 30} ${CX - 45} ${CY} Z`} />
            </clipPath>
          </defs>

          {/* Sclera (white of eye) */}
          <path
            d={`M ${CX - 45} ${CY} Q ${CX} ${CY - 30} ${CX + 45} ${CY} Q ${CX} ${CY + 30} ${CX - 45} ${CY} Z`}
            fill={`${C}0.03)`}
            stroke={`${C}0.5)`}
            strokeWidth="1.0"
            filter="url(#eye-outer-glow)"
          />

          {/* Iris and pupil group clipped to eye shape */}
          <g clipPath="url(#eye-clip)" filter="url(#eye-glow)">
            {/* Iris background */}
            <circle cx={CX} cy={CY} r={IRIS_R} fill={`${C}0.06)`} stroke={`${C}0.65)`} strokeWidth="1.4" />

            {/* Rotating iris fibers */}
            <motion.g
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              {FIBERS.map((f, i) => (
                <line key={i}
                  x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2}
                  stroke={`${C}${(0.28 - (i % 3) * 0.04).toFixed(2)})`}
                  strokeWidth="0.45"
                />
              ))}
            </motion.g>

            {/* Concentric iris rings */}
            {IRIS_RINGS.map(({ r, op, sw }, i) => (
              <circle key={i} cx={CX} cy={CY} r={r}
                fill="none"
                stroke={`${C}${op})`}
                strokeWidth={sw}
              />
            ))}

            {/* Limbal ring */}
            <circle cx={CX} cy={CY} r={IRIS_R - 0.5}
              fill="none" stroke={`${C}0.6)`} strokeWidth="1.6" />

            {/* Pupil */}
            <circle cx={CX} cy={CY} r={PUPIL_R}
              fill={`${C}0.12)`} stroke={`${C}0.9)`} strokeWidth="1.0" />

            {/* Pupil center dot */}
            <circle cx={CX} cy={CY} r="2" fill={`${C}0.8)`} />

            {/* Corneal highlight */}
            <ellipse cx={CX + 4} cy={CY - 5} rx="3" ry="2"
              fill="rgba(255,255,255,0.12)" />

            {/* Retinal scan reference lines */}
            {[-8, 0, 8].map((dy, i) => (
              <line key={i}
                x1={CX - IRIS_R + 2} y1={CY + dy}
                x2={CX + IRIS_R - 2} y2={CY + dy}
                stroke={`${C}0.12)`} strokeWidth="0.4"
                strokeDasharray="2 3"
              />
            ))}
          </g>

          {/* Scan line sweeping across */}
          <motion.rect
            x={CX - 50} y={CY - 1} width="100" height="1.4"
            fill={`${C}0.9)`} filter="url(#eye-scan)"
            clipPath="url(#eye-clip)"
            animate={{ x: [CX - 55, CX + 55, CX - 55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
          />
          <motion.rect
            x={CX - 50} y={CY - 6} width="100" height="10"
            fill={`${C}0.06)`} filter="url(#eye-scan)"
            clipPath="url(#eye-clip)"
            animate={{ x: [CX - 55, CX + 55, CX - 55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
          />

          {/* Corner bracket decorations */}
          {[
            { x: 14, y: 55, r: 0   },
            { x: 106, y: 55, r: 90  },
            { x: 106, y: 115, r: 180 },
            { x: 14,  y: 115, r: 270 },
          ].map(({ x, y, r }, i) => (
            <g key={i} transform={`rotate(${r},${x},${y})`}>
              <line x1={x} y1={y} x2={x + 8} y2={y} stroke={`${C}0.4)`} strokeWidth="0.8"/>
              <line x1={x} y1={y} x2={x} y2={y + 8} stroke={`${C}0.4)`} strokeWidth="0.8"/>
            </g>
          ))}

          {/* Measurement arcs */}
          <path d={`M ${CX - 38} ${CY} A 38 38 0 0 1 ${CX + 38} ${CY}`}
            fill="none" stroke={`${C}0.15)`} strokeWidth="0.5" strokeDasharray="3 4" />
          <path d={`M ${CX - 38} ${CY} A 38 38 0 0 0 ${CX + 38} ${CY}`}
            fill="none" stroke={`${C}0.15)`} strokeWidth="0.5" strokeDasharray="3 4" />
        </svg>

        {/* Status readout */}
        <div className="w-full flex flex-col gap-1.5"
          style={{ borderTop: `1px solid ${C}0.18)`, paddingTop: "0.6rem" }}>
          {[
            { label: "STATUS",  value: "VERIFIED"  },
            { label: "MATCH",   value: "99.1%"     },
            { label: "TYPE",    value: "RETINAL"   },
            { label: "QUALITY", value: "HIGH"      },
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
