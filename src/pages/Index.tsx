import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import TrainingSection from "@/components/TrainingSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative bg-background noise-bg">
      
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TrainingSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
