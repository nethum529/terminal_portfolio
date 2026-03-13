"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";

interface SkillGroup {
  category: string;
  items: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "LANGUAGES",
    items: ["C++", "TypeScript", "Python", "JavaScript", "C"],
  },
  {
    category: "FRAMEWORKS",
    items: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    category: "TOOLS",
    items: ["Git", "GitHub", "VSCode", "Linux"],
  },
  {
    category: "DOMAINS",
    items: ["HCI Research", "Sketch Recognition", "Web Development", "Systems"],
  },
];

function SkillBar({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 text-xs"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <span className="text-terminal-glow select-none">▸</span>
      <span className="text-terminal-text tracking-wider">{label}</span>
    </motion.div>
  );
}

export function SkillsPanel() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        className="text-xs text-terminal-muted tracking-[0.4em] uppercase mb-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span>// SKILL MATRIX</span>
        <div className="flex-1 h-px bg-terminal-border" />
        <span>SEC.03</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKILL_GROUPS.map((group, gi) => (
          <Panel
            key={group.category}
            title={group.category}
            delay={gi * 0.1}
          >
            <div className="space-y-2.5">
              {group.items.map((item, i) => (
                <SkillBar key={item} label={item} index={i} />
              ))}
            </div>
          </Panel>
        ))}
      </div>

      {/* Primary language callout */}
      <motion.div
        className="mt-6 panel-border bg-terminal-panel p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-xs text-terminal-muted tracking-wider">
          PRIMARY LANGUAGE
        </div>
        <div className="text-sm text-terminal-bright text-glow-accent tracking-[0.3em] font-mono">
          C++
        </div>
        <div className="text-xs text-terminal-muted tracking-wider">
          PROFICIENCY: HIGH
        </div>
      </motion.div>
    </section>
  );
}
