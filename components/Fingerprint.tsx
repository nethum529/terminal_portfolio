"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const C = "rgba(200,185,255,";

// 22 rings — each has a slight center drift (dx,dy) to simulate whorl spiral
const RINGS = [
  { rx:2,   ry:3,   dx: 0.0, dy: 0.0, dash:"6 0.8",        off:0,  op:1.00, rot:  0, sw:1.4 },
  { rx:5,   ry:7,   dx: 0.3, dy: 0.1, dash:"10 1 2 0.5",   off:2,  op:0.99, rot:  4, sw:1.2 },
  { rx:8,   ry:11,  dx: 0.6, dy: 0.3, dash:"14 1 3 1",     off:4,  op:0.98, rot: -3, sw:1.15},
  { rx:11,  ry:15,  dx: 1.0, dy: 0.4, dash:"16 1 4 1",     off:7,  op:0.97, rot:  6, sw:1.1 },
  { rx:14,  ry:19,  dx: 1.2, dy: 0.5, dash:"18 1.5 3 1",   off:5,  op:0.96, rot: -5, sw:1.05},
  { rx:17,  ry:23,  dx: 1.0, dy: 0.6, dash:"20 2 5 1",     off:9,  op:0.95, rot:  8, sw:1.0 },
  { rx:20,  ry:27,  dx: 0.7, dy: 0.7, dash:"22 2 4 1.5",   off:11, op:0.93, rot: -7, sw:1.0 },
  { rx:23,  ry:31,  dx: 0.3, dy: 0.7, dash:"24 2 6 2",     off:14, op:0.91, rot: 10, sw:0.95},
  { rx:26,  ry:34,  dx:-0.2, dy: 0.6, dash:"26 2.5 5 2",   off:8,  op:0.88, rot: -8, sw:0.95},
  { rx:29,  ry:37,  dx:-0.6, dy: 0.5, dash:"28 3 7 2",     off:18, op:0.84, rot: 12, sw:0.9 },
  { rx:32,  ry:40,  dx:-1.0, dy: 0.3, dash:"30 3 6 2.5",   off:22, op:0.80, rot:-10, sw:0.9 },
  { rx:34,  ry:43,  dx:-1.2, dy: 0.1, dash:"31 3.5 8 2.5", off:10, op:0.75, rot: 14, sw:0.85},
  { rx:36,  ry:45,  dx:-1.0, dy:-0.1, dash:"32 4 7 3",     off:26, op:0.69, rot:-12, sw:0.85},
  { rx:38,  ry:47,  dx:-0.7, dy:-0.3, dash:"34 4 9 3",     off:16, op:0.61, rot: 16, sw:0.8 },
  { rx:40,  ry:49,  dx:-0.3, dy:-0.5, dash:"36 4.5 8 3.5", off:32, op:0.52, rot:-14, sw:0.8 },
  { rx:42,  ry:51,  dx: 0.1, dy:-0.6, dash:"37 5 9 4",     off:12, op:0.43, rot: 18, sw:0.75},
  { rx:44,  ry:52,  dx: 0.4, dy:-0.7, dash:"38 5.5 10 4",  off:38, op:0.33, rot:-16, sw:0.72},
  { rx:45,  ry:53,  dx: 0.2, dy:-0.7, dash:"40 6 11 4.5",  off:22, op:0.24, sw:0.68, rot: 20},
  { rx:46,  ry:54,  dx:-0.1, dy:-0.6, dash:"42 7 12 5",    off:42, op:0.15, sw:0.62, rot:-18},
  { rx:47,  ry:55,  dx:-0.3, dy:-0.5, dash:"44 8 13 6",    off:28, op:0.08, sw:0.55, rot: 22},
  { rx:48,  ry:56,  dx:-0.1, dy:-0.3, dash:"46 10 15 7",   off:48, op:0.04, sw:0.48, rot:-20},
  { rx:49,  ry:57,  dx: 0.0, dy:-0.1, dash:"48 12 16 8",   off:32, op:0.02, sw:0.4,  rot: 0 },
];

const CX = 60, CY = 82;

// Ridge endings: [x, y, angle_deg]  — small bar perpendicular to ridge
const ENDINGS: [number,number,number][] = [
  [60, 64, 0], [48, 71, 30], [73, 68, -25], [42, 82, 90],
  [79, 79, 80], [51, 94, -40], [70, 97, 35], [38, 95, 70],
  [83, 93, -60], [56, 107, 10], [65, 105, -15], [44, 110, 55],
  [76, 108, -50], [35, 102, 85], [86, 102, -75],
];

// Bifurcations: [x, y, angle_deg] — small Y mark
const BIFURCS: [number,number,number][] = [
  [55, 72, 15], [66, 74, -20], [45, 88, 60],
  [76, 86, -55], [53, 100, 25], [68, 99, -30],
  [40, 77, 75], [81, 76, -70],
];

// Delta triangles [x,y] (lower left and lower right)
const DELTAS: [number,number][] = [
  [28, 116], [92, 116],
];

// Minutiae connection lines (pairs of ending/bifurc indices for analysis overlay)
const CONNECTIONS: [number,number,number,number][] = [
  [55,72,  66,74], [45,88, 40,77], [76,86, 81,76],
  [53,100, 68,99], [60,64, 55,72], [79,79, 76,86],
];

// Analysis point labels
const LABELS: [number,number,string][] = [
  [60,64,"E1"], [48,71,"E2"], [73,68,"E3"], [42,82,"B1"],
  [79,79,"B2"], [51,94,"E4"], [70,97,"E5"], [55,72,"B3"],
  [66,74,"B4"], [45,88,"B5"],
];

function DeltaMark({ x, y }: { x:number; y:number }) {
  const s = 5;
  return (
    <g>
      <polygon
        points={`${x},${y-s} ${x-s*0.9},${y+s*0.5} ${x+s*0.9},${y+s*0.5}`}
        fill="none" stroke={`${C}0.55)`} strokeWidth="0.7"
      />
      <circle cx={x} cy={y} r="1.2" fill={`${C}0.6)`} />
    </g>
  );
}

function RidgeEnding({ x, y, a }: { x:number; y:number; a:number }) {
  const rad = (a * Math.PI) / 180;
  const px = Math.cos(rad + Math.PI/2) * 3.5;
  const py = Math.sin(rad + Math.PI/2) * 3.5;
  return (
    <g>
      <line x1={x-px} y1={y-py} x2={x+px} y2={y+py}
        stroke={`${C}0.7)`} strokeWidth="0.8" />
      <circle cx={x} cy={y} r="1.3" fill="none" stroke={`${C}0.65)`} strokeWidth="0.6" />
    </g>
  );
}

function Bifurcation({ x, y, a }: { x:number; y:number; a:number }) {
  const rad = (a * Math.PI) / 180;
  const stem = 3.5;
  const spread = 2.5;
  const ex = Math.cos(rad) * stem;
  const ey = Math.sin(rad) * stem;
  const lx = Math.cos(rad + 0.7) * spread;
  const ly = Math.sin(rad + 0.7) * spread;
  const rx2 = Math.cos(rad - 0.7) * spread;
  const ry2 = Math.sin(rad - 0.7) * spread;
  return (
    <g>
      <line x1={x} y1={y} x2={x+ex} y2={y+ey} stroke={`${C}0.7)`} strokeWidth="0.8" />
      <line x1={x+ex} y1={y+ey} x2={x+ex+lx} y2={y+ey+ly} stroke={`${C}0.7)`} strokeWidth="0.8" />
      <line x1={x+ex} y1={y+ey} x2={x+ex+rx2} y2={y+ey+ry2} stroke={`${C}0.7)`} strokeWidth="0.8" />
      <rect x={x-1.5} y={y-1.5} width="3" height="3"
        fill="none" stroke={`${C}0.6)`} strokeWidth="0.6"
        transform={`rotate(45,${x},${y})`} />
    </g>
  );
}

export function Fingerprint() {
  return (
    <TerminalWindow title="ID" tag="BIO-001" delay={0.2} glisten>
      <div className="flex flex-col items-center gap-3">

        <svg viewBox="0 0 120 168" width="100%" style={{ display:"block", maxWidth:"220px" }}>
          <defs>
            <filter id="fp-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.0" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="fp-scan" x="-100%" y="-800%" width="300%" height="1800%">
              <feGaussianBlur stdDeviation="2.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="fp-dim" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="fp-fade" cx="50%" cy="52%" r="50%">
              <stop offset="0%"   stopColor="white" stopOpacity="1"   />
              <stop offset="65%"  stopColor="white" stopOpacity="0.85"/>
              <stop offset="88%"  stopColor="white" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"   />
            </radialGradient>
            <mask id="fp-mask">
              <ellipse cx={CX} cy={CY} rx="54" ry="64" fill="url(#fp-fade)" />
            </mask>
            <mask id="fp-mask-tight">
              <ellipse cx={CX} cy={CY} rx="48" ry="58" fill="url(#fp-fade)" />
            </mask>
          </defs>

          {/* Scanner border */}
          <rect x="6" y="6" width="108" height="120"
            fill="none" stroke={`${C}0.2)`} strokeWidth="0.7" strokeDasharray="4 2" />

          {/* Corner crosshairs */}
          {([[12,12],[108,12],[12,122],[108,122]] as [number,number][]).map(([x,y],i) => (
            <g key={i}>
              <line x1={x-5} y1={y} x2={x+5} y2={y} stroke={`${C}0.35)`} strokeWidth="0.7"/>
              <line x1={x} y1={y-5} x2={x} y2={y+5} stroke={`${C}0.35)`} strokeWidth="0.7"/>
            </g>
          ))}

          {/* Ruler tick marks along top edge */}
          {Array.from({length:21},(_,i) => 6 + i*5).map(x => (
            <line key={x} x1={x} y1={6} x2={x} y2={x%10===6?10:8}
              stroke={`${C}0.2)`} strokeWidth="0.5" />
          ))}
          {/* Ruler ticks left edge */}
          {Array.from({length:25},(_,i) => 6 + i*5).map(y => (
            <line key={y} x1={6} y1={y} x2={y%10===6?10:8} y2={y}
              stroke={`${C}0.2)`} strokeWidth="0.5" />
          ))}

          {/* Faint grid lines over fingerprint area */}
          <g opacity="0.12" mask="url(#fp-mask)">
            {[40,50,60,70,80].map(x => (
              <line key={x} x1={x} y1={6} x2={x} y2={128}
                stroke={`${C}1)`} strokeWidth="0.4" strokeDasharray="2 4" />
            ))}
            {[40,55,70,82,95,110].map(y => (
              <line key={y} x1={6} y1={y} x2={114} y2={y}
                stroke={`${C}1)`} strokeWidth="0.4" strokeDasharray="2 4" />
            ))}
          </g>

          {/* ── Fingerprint ridges ── */}
          <g mask="url(#fp-mask)" filter="url(#fp-glow)">
            {/* Core dot */}
            <circle cx={CX} cy={CY} r="2" fill={`${C}1)`} />
            <circle cx={CX} cy={CY} r="4" fill="none" stroke={`${C}0.5)`} strokeWidth="0.8" />

            {RINGS.map(({ rx, ry, dx, dy, dash, off, op, rot, sw }, i) => (
              <ellipse key={i}
                cx={CX + dx} cy={CY + dy}
                rx={rx} ry={ry}
                fill="none"
                stroke={`${C}${op})`}
                strokeWidth={sw}
                strokeDasharray={dash}
                strokeDashoffset={off}
                transform={`rotate(${rot},${CX+dx},${CY+dy})`}
              />
            ))}
          </g>

          {/* ── Minutiae overlay ── */}
          <g mask="url(#fp-mask-tight)" filter="url(#fp-dim)">
            {/* Connection lines */}
            {CONNECTIONS.map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={`${C}0.22)`} strokeWidth="0.5" strokeDasharray="2 1.5" />
            ))}
            {/* Ridge endings */}
            {ENDINGS.map(([x,y,a],i) => <RidgeEnding key={i} x={x} y={y} a={a} />)}
            {/* Bifurcations */}
            {BIFURCS.map(([x,y,a],i) => <Bifurcation key={i} x={x} y={y} a={a} />)}
            {/* Minutiae labels */}
            {LABELS.map(([x,y,label],i) => (
              <text key={i} x={(x as number)+4} y={(y as number)-3}
                fill={`${C}0.45)`} fontSize="4" fontFamily="monospace">{label}</text>
            ))}
          </g>

          {/* ── Delta patterns ── */}
          {DELTAS.map(([x,y],i) => <DeltaMark key={i} x={x} y={y} />)}

          {/* Core type marker */}
          <text x={CX} y={CY-8} textAnchor="middle"
            fill={`${C}0.35)`} fontSize="4" fontFamily="monospace">CORE</text>

          {/* Delta labels */}
          <text x={28} y={124} textAnchor="middle"
            fill={`${C}0.35)`} fontSize="4" fontFamily="monospace">Δ L</text>
          <text x={92} y={124} textAnchor="middle"
            fill={`${C}0.35)`} fontSize="4" fontFamily="monospace">Δ R</text>

          {/* Ridge count markers along left edge */}
          {[55, 65, 75, 90, 105].map((y,i) => (
            <g key={i}>
              <line x1={6} y1={y} x2={12} y2={y} stroke={`${C}0.3)`} strokeWidth="0.5" />
              <text x={13} y={y+1.5} fill={`${C}0.25)`} fontSize="3.5" fontFamily="monospace">
                {10 + i * 3}
              </text>
            </g>
          ))}

          {/* Scan line */}
          <motion.rect x="8" y="8" width="104" height="1.4"
            fill={`${C}0.9)`} filter="url(#fp-scan)" mask="url(#fp-mask)"
            animate={{ y: [8, 120, 8] }}
            transition={{ duration: 3.2, repeat: Infinity, ease:"linear", repeatDelay:0.8 }}
          />
          <motion.rect x="8" y="8" width="104" height="10"
            fill={`${C}0.09)`} filter="url(#fp-scan)" mask="url(#fp-mask)"
            animate={{ y: [0, 112, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease:"linear", repeatDelay:0.8 }}
          />

          {/* Bottom readout separator */}
          <line x1="6" y1="134" x2="114" y2="134"
            stroke={`${C}0.2)`} strokeWidth="0.6" />

          {/* Inline data fields in SVG */}
          {[
            ["PATTERN", "WHORL",    6,   142],
            ["CLASS",   "FMR",      6,   150],
            ["RIDGE CT","24L / 21R", 6,  158],
            ["MINUTIAE","23 PTS",   6,   165],
          ].map(([k,v,x,y]) => (
            <g key={k as string}>
              <text x={x as number} y={y as number}
                fill={`${C}0.45)`} fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">
                {k as string}
              </text>
              <text x={114} y={y as number} textAnchor="end"
                fill={`${C}0.88)`} fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">
                {v as string}
              </text>
            </g>
          ))}
        </svg>

        {/* Status block below SVG */}
        <div className="w-full flex flex-col gap-1.5"
          style={{ borderTop:`1px solid ${C}0.18)`, paddingTop:"0.65rem" }}>
          {[
            { label:"STATUS",  value:"VERIFIED",  hi: true  },
            { label:"MATCH",   value:"98.7%",      hi: true  },
            { label:"QUALITY", value:"HIGH",       hi: false },
            { label:"SENSOR",  value:"CAP-500dpi", hi: false },
          ].map(({ label, value, hi }, i) => (
            <motion.div key={label} className="flex justify-between"
              initial={{ opacity:0, x:-4 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.2, delay:0.3+i*0.06 }}>
              <span style={{ fontSize:"0.78rem", letterSpacing:"0.15em",
                color:`${C}0.5)`, textTransform:"uppercase", fontFamily:"monospace" }}>
                {label}
              </span>
              <span style={{ fontSize:"0.78rem", letterSpacing:"0.12em",
                color: hi ? `${C}0.95)` : `${C}0.7)`,
                textTransform:"uppercase", fontFamily:"monospace" }}>
                {value}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </TerminalWindow>
  );
}
