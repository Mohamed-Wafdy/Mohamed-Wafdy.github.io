import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Name reveal
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 40, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.02, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 80, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    const particles = sectionRef.current?.querySelectorAll(".particle");
    particles?.forEach((p) => {
      gsap.to(p, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ perspective: "500px" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-[120px]" />

      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div ref={orbitRef} className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-border/30">
        <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
        <div className="absolute top-1/2 -right-1.5 w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
        <div className="absolute -bottom-1 left-1/3 w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glow-border">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-sm font-mono text-muted-foreground">Available for work</span>
        </div>

        <h2
          ref={nameRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-primary"
        >
          {splitText("Mohamed Wafdy Ashour")}
        </h2>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-6"
        >
          <span className="block text-foreground">{splitText("Frontend")}</span>
          <span className="block text-foreground">{splitText("Developer")}</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
          Crafting <span className="text-primary">interactive</span> and{" "}
          <span className="text-secondary">immersive</span> digital experiences with modern web technologies
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection("projects")}
            className="magnetic-btn px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-box transition-transform hover:scale-105"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="magnetic-btn px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:border-primary/50 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-primary animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
