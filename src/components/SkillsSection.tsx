import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", level: 95, color: "hsl(var(--primary))" },
  { name: "TypeScript", level: 90, color: "hsl(var(--primary))" },
  { name: "JavaScript", level: 95, color: "hsl(var(--accent))" },
  { name: "HTML / CSS", level: 95, color: "hsl(var(--primary))" },
  { name: "GSAP", level: 85, color: "hsl(var(--glow-secondary))" },
  { name: "Tailwind CSS", level: 90, color: "hsl(var(--primary))" },
  { name: "Next.js", level: 80, color: "hsl(var(--secondary))" },
  { name: "Git & GitHub", level: 88, color: "hsl(var(--accent))" },
];

const tools = [
  "VS Code", "Figma", "Chrome DevTools", "Postman", "Terminal", "Vite", "Webpack", "npm/yarn"
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo(".skills-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".skills-heading", start: "top 80%" } }
      );

      // Skill bars
      const bars = document.querySelectorAll(".skill-bar-fill");
      bars.forEach((bar, i) => {
        const width = bar.getAttribute("data-level") || "0";
        gsap.fromTo(bar,
          { width: "0%" },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 85%", toggleActions: "play none none reverse" },
            delay: i * 0.1,
          }
        );
      });

      // Skill labels
      gsap.fromTo(".skill-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.08,
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Tools
      gsap.fromTo(".tool-tag",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.05,
          scrollTrigger: { trigger: ".tools-grid", start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary mb-4 block">// SKILLS & TOOLS</span>
          <h2 className="skills-heading text-4xl md:text-6xl font-bold">
            My <span className="gradient-text">Arsenal</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="skills-grid space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-sm text-foreground">{skill.name}</span>
                  <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full transition-all"
                    data-level={skill.level}
                    style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, width: "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Tools & Technologies</h3>
            <div className="tools-grid flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="tool-tag px-4 py-2 rounded-lg glow-border bg-card/50 backdrop-blur-sm font-mono text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl glow-border bg-card/30 backdrop-blur-sm">
              <p className="font-mono text-sm text-muted-foreground mb-2">// current focus</p>
              <p className="text-foreground leading-relaxed">
                Currently diving deep into <span className="text-primary">GSAP animations</span>,{" "}
                <span className="text-secondary">Three.js</span>, and{" "}
                <span className="text-accent">advanced CSS</span> to create unforgettable web experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
