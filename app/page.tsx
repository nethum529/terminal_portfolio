import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContactSection } from "@/components/ContactSection";
import { IdentificationPanel } from "@/components/IdentificationPanel";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsPanel } from "@/components/SkillsPanel";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="relative max-w-[1440px] mx-auto px-6 pt-16 pb-10 space-y-6"
        style={{ zIndex: 10 }}
      >
        <section id="profile" className="scroll-mt-16">
          <ScrollReveal>
            <Hero />
          </ScrollReveal>
        </section>

        <section id="contact" className="scroll-mt-16">
          <ScrollReveal delay={0.05}>
            <ContactSection />
          </ScrollReveal>
        </section>

        <section id="identity" className="scroll-mt-16">
          <ScrollReveal delay={0.05}>
            <IdentificationPanel />
          </ScrollReveal>
        </section>

        <section id="projects" className="scroll-mt-16">
          <ScrollReveal delay={0.05}>
            <ProjectsSection />
          </ScrollReveal>
        </section>

        <section id="skills" className="scroll-mt-16">
          <ScrollReveal delay={0.05}>
            <SkillsPanel />
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
