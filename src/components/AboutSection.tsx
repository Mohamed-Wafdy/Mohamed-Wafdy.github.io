import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", end: "top 50%", scrub: 1 },
        }
      );

      // Paragraph lines
      textRefs.current.forEach((p, i) => {
        gsap.fromTo(p,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: p, start: "top 85%", toggleActions: "play none none reverse" },
            delay: i * 0.15,
          }
        );
      });

      // Stats counter
      const statEls = statsRef.current?.querySelectorAll(".stat-number");
      statEls?.forEach((el) => {
        const target = parseInt(el.getAttribute("data-value") || "0");
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
            onUpdate: function () {
              (el as HTMLElement).textContent = Math.ceil(parseFloat((el as HTMLElement).style.getPropertyValue("--val") || gsap.getProperty(el, "innerText") as string)).toString();
            },
          }
        );
      });

      // Stats cards
      const cards = statsRef.current?.querySelectorAll(".stat-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addTextRef = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  const stats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 25, suffix: "+", label: "Projects Completed" },
    { value: 15, suffix: "+", label: "Happy Clients" },
    { value: 99, suffix: "%", label: "Code Quality" },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-sm font-mono text-primary mb-4 block">// ABOUT ME</span>
            <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Building the{" "}
              <span className="gradient-text">future</span>
              <br />
              of the web
            </h2>
          </div>
          <div className="space-y-6">
            <p ref={addTextRef} className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate frontend developer who loves turning complex problems into simple, 
              beautiful, and intuitive web experiences. With expertise in modern frameworks and 
              a keen eye for design.
            </p>
            <p ref={addTextRef} className="text-lg text-muted-foreground leading-relaxed">
              I specialize in creating performant, accessible, and visually stunning applications 
              using React, TypeScript, and modern CSS. Every pixel matters.
            </p>
            <p ref={addTextRef} className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card p-6 rounded-xl glow-border bg-card/50 backdrop-blur-sm text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <span className="stat-number" data-value={stat.value}>{stat.value}</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
