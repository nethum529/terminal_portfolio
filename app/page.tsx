import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { IdentificationPanel } from "@/components/IdentificationPanel";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsPanel } from "@/components/SkillsPanel";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* All panels stacked densely in a single column */}
      <main
        className="relative max-w-3xl mx-auto px-3 pt-12 pb-4 space-y-2"
        style={{ zIndex: 10 }}
      >
        {/* Hero terminal — full width */}
        <section id="profile">
          <Hero />
        </section>

        {/* Identification */}
        <section id="identity">
          <IdentificationPanel />
        </section>

        {/* Projects */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Skills */}
        <section id="skills">
          <SkillsPanel />
        </section>

        {/* Contact */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </>
  );
}
