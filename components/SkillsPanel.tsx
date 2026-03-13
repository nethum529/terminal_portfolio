"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";
import { SectionHeader } from "./IdentificationPanel";

const SKILLS = [
  {
    category: "LANGUAGES",
    items: ["Python", "C++", "Swift", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  {
    category: "FRAMEWORKS",
    items: ["FastAPI", "Next.js", "Pandas", "NumPy", "PyTorch"],
  },
  {
    category: "TOOLS",
    items: ["Git", "Supabase", "Google Colab", "Jupyter Notebooks"],
  },
];

export function SkillsPanel() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeader label="// SKILL MATRIX" index="03" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SKILLS.map((group, gi) => (
          <Panel key={group.category} title={group.category} delay={gi * 0.08}>
            <div className="space-y-1.5">
              {group.items.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 text-xs text-text"
                  initial={{ opacity: 0, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: gi * 0.08 + i * 0.04 }}
                >
                  <span className="text-muted select-none text-[0.6rem]">▸</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}
