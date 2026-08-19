import { HeroSection } from './sections/jack/HeroSection';
import { MarqueeSection } from './sections/jack/MarqueeSection';
import { AboutSection } from './sections/jack/AboutSection';
import { SkillsSection } from './sections/jack/SkillsSection';
import { ProjectsSection } from './sections/jack/ProjectsSection';
import { ExperienceSection } from './sections/jack/ExperienceSection';
import { ContactSection } from './sections/jack/ContactSection';
import { FooterSection } from './sections/jack/FooterSection';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit antialiased overflow-x-clip">
      <main className="w-full flex flex-col">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
