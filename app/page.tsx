import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { IdentificationPanel } from "@/components/IdentificationPanel";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsPanel } from "@/components/SkillsPanel";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <Hero />
      <IdentificationPanel />
      <ProjectsSection />
      <SkillsPanel />
      <ContactSection />
      <Footer />
    </main>
  );
}
