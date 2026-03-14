"use client";

import { TerminalWindow } from "./ui/TerminalWindow";

const C = "rgba(200,185,255,";

// ── Central CPU (large, with BGA dot grid) ──────────────
const CPU = { x: 555, y: 100, w: 260, h: 260 };
// BGA grid: 11×11 dots inside CPU die area
const BGA: { cx: number; cy: number }[] = [];
for (let r = 0; r < 11; r++) {
  for (let c = 0; c < 11; c++) {
    BGA.push({
      cx: CPU.x + 44 + c * 16,
      cy: CPU.y + 50 + r * 14,
    });
  }
}

// ── Memory modules (long thin DIMMs, left side) ─────────
const DIMMS = [
  { x: 30,  y: 38,  w: 210, h: 20 },
  { x: 30,  y: 68,  w: 210, h: 20 },
  { x: 30,  y: 98,  w: 210, h: 20 },
  { x: 30,  y: 128, w: 210, h: 20 },
];

// ── IC chips (varied sizes) ──────────────────────────────
const CHIPS = [
  // Northbridge/MCH — between DIMMs and CPU
  { x: 285, y: 60,  w: 110, h: 95,  label: "MCH",  bga: false },
  // GPU die — upper right, large
  { x: 890, y: 55,  w: 180, h: 155, label: "GPU",  bga: true  },
  // PCH/Southbridge — lower right area
  { x: 860, y: 310, w: 115, h: 105, label: "PCH",  bga: false },
  // Audio codec — left-center
  { x: 155, y: 300, w: 78,  h: 65,  label: "AUD",  bga: false },
  // LAN controller — far right
  { x: 1130, y: 335, w: 90, h: 72,  label: "LAN",  bga: false },
  // BIOS ROM — upper far right
  { x: 1230, y: 165, w: 68, h: 50,  label: "BIOS", bga: false },
  // VRM controller 1
  { x: 390,  y: 390, w: 68, h: 58,  label: "VRM",  bga: false },
  // VRM controller 2
  { x: 680,  y: 420, w: 62, h: 52,  label: "VRM",  bga: false },
  // USB controller
  { x: 990,  y: 395, w: 82, h: 65,  label: "USB",  bga: false },
  // Clock gen
  { x: 285,  y: 380, w: 58, h: 48,  label: "CLK",  bga: false },
  // Small IC top right
  { x: 1240, y: 80,  w: 55, h: 45,  label: "I/O",  bga: false },
];

// ── SMD discrete components (tiny resistors/capacitors) ─
const DISCRETES = [
  // Around CPU
  { x: 505, y: 92,  w: 14, h: 6,  rot: 0   },
  { x: 522, y: 92,  w: 14, h: 6,  rot: 0   },
  { x: 539, y: 92,  w: 14, h: 6,  rot: 0   },
  { x: 505, y: 370, w: 14, h: 6,  rot: 0   },
  { x: 522, y: 370, w: 14, h: 6,  rot: 0   },
  { x: 830, y: 150, w: 6,  h: 14, rot: 0   },
  { x: 830, y: 170, w: 6,  h: 14, rot: 0   },
  { x: 830, y: 190, w: 6,  h: 14, rot: 0   },
  { x: 830, y: 210, w: 6,  h: 14, rot: 0   },
  { x: 830, y: 230, w: 6,  h: 14, rot: 0   },
  // Near DIMMs
  { x: 250, y: 38,  w: 14, h: 6,  rot: 0   },
  { x: 250, y: 52,  w: 14, h: 6,  rot: 0   },
  { x: 250, y: 68,  w: 14, h: 6,  rot: 0   },
  { x: 250, y: 82,  w: 14, h: 6,  rot: 0   },
  // Scattered
  { x: 450, y: 420, w: 14, h: 6,  rot: 0   },
  { x: 470, y: 420, w: 14, h: 6,  rot: 0   },
  { x: 600, y: 410, w: 6,  h: 14, rot: 0   },
  { x: 755, y: 415, w: 14, h: 6,  rot: 0   },
  { x: 775, y: 415, w: 14, h: 6,  rot: 0   },
  { x: 1100, y: 165, w: 6, h: 14, rot: 0   },
  { x: 1120, y: 165, w: 6, h: 14, rot: 0   },
  { x: 1200, y: 310, w: 14, h: 6, rot: 0   },
  { x: 1220, y: 310, w: 14, h: 6, rot: 0   },
  { x: 140,  y: 200, w: 6,  h: 14, rot: 0  },
  { x: 140,  y: 220, w: 6,  h: 14, rot: 0  },
  { x: 140,  y: 240, w: 6,  h: 14, rot: 0  },
];

// ── Mounting holes (4 corners + 2 mid-edge) ─────────────
const HOLES = [
  { cx: 25,   cy: 25   },
  { cx: 1375, cy: 25   },
  { cx: 25,   cy: 475  },
  { cx: 1375, cy: 475  },
  { cx: 700,  cy: 18   },
  { cx: 700,  cy: 482  },
];

// ── Trace paths ─────────────────────────────────────────
const TRACES_THIN = [
  // CPU ↔ MCH bus (horizontal, then vertical)
  "M 555,185 H 430 V 107 H 395",
  "M 555,205 H 430 V 122 H 395",
  "M 555,225 H 430 V 137 H 395",
  // MCH ↔ DIMMs (fan out)
  "M 285,80  H 240",
  "M 285,95  H 240",
  "M 285,110 H 240",
  "M 285,125 H 240",
  "M 285,140 H 240",
  // CPU ↔ GPU (right bus)
  "M 815,165 H 860 V 120 H 890",
  "M 815,185 H 850 V 135 H 890",
  "M 815,205 H 860 V 150 H 890",
  "M 815,225 H 855 V 165 H 890",
  // CPU ↔ PCH
  "M 815,265 H 858 V 314 H 860",
  "M 815,280 H 845 V 328 H 860",
  "M 815,295 H 858 V 342 H 860",
  // CPU → VRM (power delivery — straight down)
  "M 598,360 V 392 H 390",
  "M 615,360 V 392 H 458",
  "M 632,360 V 428 H 680",
  "M 650,360 V 436 H 742",
  // PCH ↔ USB
  "M 975,358 H 990",
  "M 975,373 H 990",
  "M 975,388 H 990",
  // PCH ↔ LAN
  "M 975,340 H 1000 V 370 H 1130",
  "M 975,355 H 1010 V 385 H 1130",
  // PCH ↔ BIOS
  "M 975,325 H 1090 V 190 H 1230",
  "M 975,312 H 1085 V 175 H 1230",
  // GPU ↔ I/O
  "M 1070,78  H 1200 V 102 H 1240",
  "M 1070,92  H 1210 V 95  H 1240",
  // AUD traces
  "M 155,345 H 100 V 380 H 65",
  "M 155,330 H 95  V 420 H 65",
  // CLK ↔ MCH
  "M 343,380 V 310 H 310 V 155",
  // Long horizontal power rails
  "M 30,18  H 1370",
  "M 30,482 H 1370",
  // Vertical edge traces
  "M 18,38  V 455",
  "M 1382,55 V 440",
  // Cross-board routing
  "M 555,145 V 52  H 395",
  "M 815,145 V 52  H 1070",
  "M 700,18  V 38",
  "M 700,482 V 420",
  // Fine stubs around CPU
  "M 555,250 H 510 V 280 H 390",
  "M 555,270 H 505 V 295 H 285",
  "M 555,290 H 500 V 315 H 155",
  "M 555,310 H 500 V 330 H 155",
  "M 630,360 V 378 H 858",
  "M 648,360 V 395 H 858",
];

// Thicker bus traces (main data highways)
const TRACES_BUS = [
  // Main CPU–GPU PCIe bus
  "M 815,240 H 870 V 200 H 890",
  // CPU–MCH address bus (wider)
  "M 555,170 H 410 V 85  H 395",
  // Memory bus
  "M 285,75  H 245",
];

// ── Via dots ─────────────────────────────────────────────
const VIAS: [number, number][] = [
  [430, 107], [430, 122], [430, 137],
  [860, 120], [860, 150], [860, 165],
  [858, 314], [845, 328],
  [1000, 370], [1010, 385],
  [1090, 190], [1085, 175],
  [1200, 102], [1210, 95],
  [310, 155],  [343, 310],
  [505, 280],  [500, 315], [500, 330],
  [858, 378],  [858, 395],
  [870, 200],  [410, 85],
];

// ── Signal pulses ─────────────────────────────────────────
const PULSES: [string, number, number][] = [
  ["M 555,185 H 430 V 107 H 395", 1.4, 0.0],
  ["M 815,165 H 860 V 120 H 890", 1.2, 0.3],
  ["M 815,265 H 858 V 314 H 860", 1.6, 0.7],
  ["M 975,340 H 1000 V 370 H 1130", 1.3, 1.1],
  ["M 975,325 H 1090 V 190 H 1230", 1.5, 0.5],
  ["M 285,80  H 240",              0.8, 0.2],
  ["M 285,95  H 240",              0.8, 0.6],
  ["M 598,360 V 392 H 390",        1.4, 0.9],
  ["M 632,360 V 428 H 680",        1.3, 1.3],
];

// ── Main component ────────────────────────────────────────────────────────────
export function CircuitBoard() {
  return (
    <TerminalWindow title="SYSTEM ARCHITECTURE" tag="PCB-001" delay={0.15}>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 1400 500"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block", minWidth: "700px" }}
        >
          <defs>
            <filter id="cb-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cb-chip-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cb-pulse-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cb-via-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* PCB edge border */}
          <rect x="2" y="2" width="1396" height="496"
            fill="none" stroke={`${C}0.15)`} strokeWidth="1" strokeDasharray="8 4" />

          {/* ── Thin traces ── */}
          {TRACES_THIN.map((d, i) => (
            <path key={`thin-${i}`} d={d} fill="none"
              stroke={`${C}0.28)`} strokeWidth="1" />
          ))}

          {/* ── Bus traces ── */}
          {TRACES_BUS.map((d, i) => (
            <path key={`bus-${i}`} d={d} fill="none"
              stroke={`${C}0.45)`} strokeWidth="2" />
          ))}

          {/* ── Mounting holes ── */}
          {HOLES.map((hole, i) => (
            <g key={`hole-${i}`}>
              <circle cx={hole.cx} cy={hole.cy} r="8"
                stroke={`${C}0.3)`} strokeWidth="1" fill="none" />
              <circle cx={hole.cx} cy={hole.cy} r="4"
                fill={`${C}0.15)`} stroke={`${C}0.5)`} strokeWidth="0.8" />
            </g>
          ))}

          {/* ── DIMM modules ── */}
          {DIMMS.map((dimm, i) => (
            <g key={`dimm-${i}`}>
              {/* Body */}
              <rect x={dimm.x} y={dimm.y} width={dimm.w} height={dimm.h}
                fill={`${C}0.04)`} stroke={`${C}0.5)`} strokeWidth="1" />
              {/* Contact fingers — 18 rects along bottom edge */}
              {Array.from({ length: 18 }, (_, fi) => {
                const spacing = (dimm.w - 10) / 17;
                const fx = dimm.x + 5 + fi * spacing;
                return (
                  <rect key={fi}
                    x={fx - 1.5} y={dimm.y + dimm.h - 6}
                    width={3} height={6}
                    fill={`${C}0.5)`} />
                );
              })}
              {/* Label */}
              <text
                x={dimm.x + dimm.w / 2} y={dimm.y + dimm.h / 2 + 3}
                textAnchor="middle"
                fill={`${C}0.7)`} fontSize="8" fontFamily="monospace" letterSpacing="2">
                DIMM{i}
              </text>
            </g>
          ))}

          {/* ── Central CPU ── */}
          <g>
            {/* Outer body */}
            <rect x={CPU.x} y={CPU.y} width={CPU.w} height={CPU.h}
              fill={`${C}0.05)`} stroke={`${C}0.6)`} strokeWidth="1.5"
              filter="url(#cb-chip-glow)" />
            {/* Keep-out rect */}
            <rect x={CPU.x + 10} y={CPU.y + 10}
              width={CPU.w - 20} height={CPU.h - 20}
              fill="none" stroke={`${C}0.25)`} strokeWidth="0.5" />
            {/* Die area */}
            <rect x={CPU.x + 35} y={CPU.y + 45}
              width={CPU.w - 70} height={CPU.h - 75}
              fill={`${C}0.08)`} stroke={`${C}0.4)`} strokeWidth="1" />
            {/* BGA dots */}
            {BGA.map((dot, i) => (
              <circle key={i} cx={dot.cx} cy={dot.cy} r="1.8"
                fill={`${C}0.65)`} />
            ))}
            {/* Pin-1 marker */}
            <circle cx={CPU.x + 48} cy={CPU.y + 58} r="3"
              fill={`${C}0.4)`} />
            {/* Center label */}
            <text
              x={CPU.x + CPU.w / 2} y={CPU.y + CPU.h - 12}
              textAnchor="middle"
              fill={`${C}0.9)`} fontSize="11" fontFamily="monospace" letterSpacing="3">
              CPU
            </text>
          </g>

          {/* ── IC Chips ── */}
          {CHIPS.map((chip, i) => (
            <g key={`chip-${i}`}>
              {/* Body */}
              <rect x={chip.x} y={chip.y} width={chip.w} height={chip.h}
                fill={`${C}0.05)`} stroke={`${C}0.5)`} strokeWidth="1"
                filter="url(#cb-chip-glow)" />
              {/* Inner detail rect */}
              <rect x={chip.x + 4} y={chip.y + 4}
                width={chip.w - 8} height={chip.h - 8}
                fill="none" stroke={`${C}0.12)`} strokeWidth="0.5" />
              {/* Mini BGA grid if bga: true */}
              {chip.bga && Array.from({ length: 6 * 5 }, (_, di) => {
                const row = Math.floor(di / 6);
                const col = di % 6;
                return (
                  <circle key={di}
                    cx={chip.x + 20 + col * 12}
                    cy={chip.y + 25 + row * 12}
                    r="1.2"
                    fill={`${C}0.5)`} />
                );
              })}
              {/* Pin-1 dot */}
              <circle cx={chip.x + 8} cy={chip.y + 8} r="2"
                fill={`${C}0.5)`} />
              {/* Label */}
              <text
                x={chip.x + chip.w / 2} y={chip.y + chip.h / 2 + 4}
                textAnchor="middle"
                fill={`${C}0.85)`} fontSize="10" fontFamily="monospace" letterSpacing="2">
                {chip.label}
              </text>
            </g>
          ))}

          {/* ── SMD Discretes ── */}
          {DISCRETES.map((d, i) => (
            <g key={`smd-${i}`}>
              {/* Body */}
              <rect x={d.x} y={d.y} width={d.w} height={d.h}
                fill={`${C}0.08)`} stroke={`${C}0.35)`} strokeWidth="0.5" />
              {/* Left/top end pad */}
              <rect x={d.x} y={d.y} width={3} height={d.h}
                fill={`${C}0.45)`} />
              {/* Right/bottom end pad */}
              <rect x={d.x + d.w - 3} y={d.y} width={3} height={d.h}
                fill={`${C}0.45)`} />
            </g>
          ))}

          {/* ── Via dots ── */}
          {VIAS.map(([vx, vy], i) => (
            <circle key={`via-${i}`} cx={vx} cy={vy} r="3"
              fill={`${C}0.82)`} filter="url(#cb-via-glow)" />
          ))}

          {/* ── Signal pulses ── */}
          {PULSES.map(([path, dur, delay], i) => (
            <circle key={`pulse-${i}`} r="2.5"
              fill={`${C}1)`} filter="url(#cb-pulse-glow)">
              <animateMotion
                dur={`${dur}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
                path={path}
              />
            </circle>
          ))}
        </svg>
      </div>
    </TerminalWindow>
  );
}
