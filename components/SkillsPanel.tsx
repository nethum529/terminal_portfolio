"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const SKILLS = [
  { category: "LANGUAGES",  items: ["Python", "C++", "Swift", "TypeScript", "JavaScript", "Java", "SQL"] },
  { category: "FRAMEWORKS", items: ["FastAPI", "Next.js", "Pandas", "NumPy", "PyTorch"] },
  { category: "TOOLS",      items: ["Git", "Supabase", "Google Colab", "Jupyter Notebooks"] },
];

export function SkillsPanel() {
  return (
    <div>
      <p className="section-label mb-2">SKILL MATRIX</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {SKILLS.map((group, gi) => (
          <TerminalWindow
            key={group.category}
            title={group.category}
            delay={gi * 0.07}
            bounce
            glitch={gi === 0}
            float
            floatDuration={4.2 + gi * 0.5}
            floatDelay={gi * 0.9}
          >
            <div className="space-y-1.5">
              {group.items.map((item, i) => (
                <motion.div key={item} className="flex items-center gap-2 text-xs leading-4"
                  style={{ color: "#8a8a8a" }}
                  initial={{ opacity: 0, x: -4 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.18, delay: gi * 0.07 + i * 0.04 }}
                >
                  <span style={{ color: "#383838", userSelect: "none", fontSize: "0.55rem" }}>▸</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </TerminalWindow>
        ))}
      </div>
    </div>
  );
}
