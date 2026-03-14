import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContactSection } from "@/components/ContactSection";
import { IdentificationPanel } from "@/components/IdentificationPanel";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsPanel } from "@/components/SkillsPanel";
import { HandprintTerminal } from "@/components/HandprintTerminal";
import { EyeTerminal } from "@/components/EyeTerminal";
import { Fingerprint } from "@/components/Fingerprint";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="relative max-w-[1440px] mx-auto px-6 pt-16 pb-10 space-y-6"
        style={{ zIndex: 10 }}
      >
        <section id="profile" className="scroll-mt-16">
          <Hero />
        </section>

        <section id="contact" className="scroll-mt-16">
          <ContactSection />
        </section>

        <section id="identity">
          <IdentificationPanel />
        </section>

        <section id="projects" className="scroll-mt-16">
          <ProjectsSection />
        </section>

        <section id="circuit">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="lg:w-56 shrink-0">
              <HandprintTerminal />
            </div>
            <div className="lg:w-56 shrink-0">
              <EyeTerminal />
            </div>
            <div className="lg:w-56 shrink-0">
              <Fingerprint />
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-16">
          <SkillsPanel />
        </section>
      </main>

      <Footer />
    </>
  );
}
