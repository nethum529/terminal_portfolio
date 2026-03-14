"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const C = "rgba(200,185,255,";
const CX = 60, CY = 92;
const ASPECT = 1.58;
const D = 2.5;
const MAX_R = 41;
const NUM_RIDGES = 17;
const THETA_STEP = 0.05;

// Warp is k-INDEPENDENT — this mathematically guarantees ridges never cross.
// At any angle θ, gap between ridge k and k+1 = exactly D (the warp cancels out).
function ridgeWarp(t: number): number {
  return 0.6 * (
    0.55 * Math.sin(t * 2.1  + 0.5) +
    0.28 * Math.sin(t * 4.7  + 1.3) +
    0.14 * Math.sin(t * 9.3  + 2.1) +
    0.07 * Math.sin(t * 17.1 + 0.9)
  );
}

function buildRidgePath(k: number): string {
  const maxTurns = Math.max(0.22, 2.1 - k * 0.125);
  const maxTheta = 2 * Math.PI * maxTurns;
  const pts: string[] = [];

  for (let t = 0; t <= maxTheta + THETA_STEP * 0.5; t += THETA_STEP) {
    const r = k * D + (t / (2 * Math.PI)) * D + ridgeWarp(t);
    if (r <= 0 || r > MAX_R) break;
    const angle = t - Math.PI / 2;
    const x = CX + r * Math.cos(angle);
    const y = CY + r * ASPECT * Math.sin(angle);
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  if (pts.length < 2) return "";
  return "M " + pts[0] + " L " + pts.slice(1).join(" L ");
}

// Minutiae — ridge endings (E) and bifurcations (B)
const MINUTIAE: { x: number; y: number; type: "E" | "B"; a: number }[] = [
  { x: 60, y: 74,  type: "E", a: 0   }, { x: 51, y: 80,  type: "B", a: 25  },
  { x: 70, y: 78,  type: "E", a: -20 }, { x: 45, y: 93,  type: "B", a: 80  },
  { x: 76, y: 90,  type: "E", a: 72  }, { x: 54, y: 106, type: "B", a: -32 },
  { x: 67, y: 108, type: "E", a: 28  }, { x: 42, y: 104, type: "B", a: 65  },
  { x: 80, y: 102, type: "E", a: -58 }, { x: 58, y: 118, type: "E", a: 10  },
  { x: 64, y: 116, type: "B", a: -14 }, { x: 48, y: 120, type: "E", a: 50  },
  { x: 73, y: 119, type: "B", a: -46 }, { x: 37, y: 110, type: "E", a: 78  },
  { x: 84, y: 108, type: "E", a: -70 }, { x: 61, y: 126, type: "B", a: 6   },
  { x: 52, y: 88,  type: "E", a: 40  }, { x: 69, y: 93,  type: "B", a: -38 },
  { x: 44, y: 77,  type: "B", a: 55  }, { x: 78, y: 82,  type: "E", a: -50 },
];

// Delta triangle positions (flanking the core — characteristic of whorl type)
const DELTAS = [
  { x: CX - 19, y: CY + 11 },
  { x: CX + 19, y: CY + 11 },
];

function MinutiaMark({ x, y, type, a }: { x: number; y: number; type: "E" | "B"; a: number }) {
  const rad = (a * Math.PI) / 180;
  if (type === "E") {
    const px = Math.cos(rad + Math.PI / 2) * 2.8;
    const py = Math.sin(rad + Math.PI / 2) * 2.8;
    return (
      <g>
        <line x1={x - px} y1={y - py} x2={x + px} y2={y + py}
          stroke={`${C}0.5)`} strokeWidth="0.65" />
        <circle cx={x} cy={y} r="1.0" fill="none" stroke={`${C}0.45)`} strokeWidth="0.5" />
      </g>
    );
  }
  const s = 3, sp = 2.0;
  const ex = Math.cos(rad) * s, ey = Math.sin(rad) * s;
  const lx = Math.cos(rad + 0.6) * sp, ly = Math.sin(rad + 0.6) * sp;
  const rx2 = Math.cos(rad - 0.6) * sp, ry2 = Math.sin(rad - 0.6) * sp;
  return (
    <g>
      <line x1={x} y1={y} x2={x + ex} y2={y + ey} stroke={`${C}0.5)`} strokeWidth="0.65" />
      <line x1={x + ex} y1={y + ey} x2={x + ex + lx} y2={y + ey + ly} stroke={`${C}0.5)`} strokeWidth="0.65" />
      <line x1={x + ex} y1={y + ey} x2={x + ex + rx2} y2={y + ey + ry2} stroke={`${C}0.5)`} strokeWidth="0.65" />
      <rect x={x - 1.2} y={y - 1.2} width="2.4" height="2.4" fill="none"
        stroke={`${C}0.4)`} strokeWidth="0.5" transform={`rotate(45,${x},${y})`} />
    </g>
  );
}

export function Fingerprint() {
  const ridgePaths = useMemo(() =>
    Array.from({ length: NUM_RIDGES }, (_, k) => ({
      d:  buildRidgePath(k),
      sw: Math.max(0.55, 1.4 - k * 0.032),
      op: 0.96 * Math.pow(0.935, k),
    })).filter(r => r.d !== "")
  , []);

  return (
    <TerminalWindow title="ID" tag="BIO-001" delay={0.2} glisten>
      <div className="flex flex-col items-center gap-3">

        <svg viewBox="0 0 120 185" width="100%" style={{ display: "block", maxWidth: "210px" }}>
          <defs>
            <filter id="fp-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.7" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="fp-scan" x="-100%" y="-900%" width="300%" height="2000%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="fp-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="white" stopOpacity="1"  />
              <stop offset="60%"  stopColor="white" stopOpacity="0.95"/>
              <stop offset="82%"  stopColor="white" stopOpacity="0.42"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"  />
            </radialGradient>
            <mask id="fp-mask">
              <ellipse cx={CX} cy={CY} rx="46" ry="73" fill="url(#fp-fade)" />
            </mask>
            <mask id="fp-mask-inner">
              <ellipse cx={CX} cy={CY} rx="40" ry="66" fill="url(#fp-fade)" />
            </mask>
          </defs>

          {/* Ridges */}
          <g mask="url(#fp-mask)" filter="url(#fp-glow)">
            {/* Core point */}
            <circle cx={CX} cy={CY} r="1.4" fill={`${C}1)`} />

            {/* Archimedean spiral ridges — non-overlapping by construction */}
            {ridgePaths.map(({ d, sw, op }, k) => (
              <path
                key={k}
                d={d}
                fill="none"
                stroke={`${C}${op.toFixed(3)})`}
                strokeWidth={sw}
                strokeLinecap="round"
              />
            ))}

            {/* Delta markers — whorl characteristic */}
            {DELTAS.map(({ x, y }, i) => (
              <path
                key={i}
                d={`M ${x} ${y - 3} L ${x - 2.5} ${y + 2} L ${x + 2.5} ${y + 2} Z`}
                fill="none"
                stroke={`${C}0.38)`}
                strokeWidth="0.55"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Minutiae overlay */}
          <g mask="url(#fp-mask-inner)">
            {MINUTIAE.map((m, i) => <MinutiaMark key={i} {...m} />)}
          </g>

          {/* Scan line */}
          <motion.rect x="14" y="19" width="92" height="1.4"
            fill={`${C}0.9)`} filter="url(#fp-scan)" mask="url(#fp-mask)"
            animate={{ y: [19, 165, 19] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
          />
          <motion.rect x="14" y="11" width="92" height="10"
            fill={`${C}0.08)`} filter="url(#fp-scan)" mask="url(#fp-mask)"
            animate={{ y: [11, 157, 11] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
          />
        </svg>

        {/* Status readout */}
        <div className="w-full flex flex-col gap-1.5"
          style={{ borderTop: `1px solid ${C}0.18)`, paddingTop: "0.6rem" }}>
          {[
            { label: "STATUS",  value: "VERIFIED" },
            { label: "MATCH",   value: "98.7%"    },
            { label: "TYPE",    value: "WHORL"     },
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
