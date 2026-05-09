import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Award, Calendar, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trainings = [
  {
    title: "Professional React Developer",
    role: "Frontend Trainee",
    org: "Digilians (Digital Pioneers Initiative)",
    location: "Cairo, Egypt",
    authority: "MCIT",
    period: "2025 – Present",
    highlights: [
      "Enrolled in a 6-month government-funded React Developer track, part of Egypt's national Digital Pioneers Initiative",
      "Built advanced React.js applications using hooks, modular component architecture, and Redux for global state management",
      "Focused on performance optimization techniques including code splitting, lazy loading, and memoization",
    ],
    color: "var(--primary)",
  },
  {
    title: "Angular Web Developer",
    role: "Frontend Trainee",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    location: "Cairo, Egypt",
    authority: "MCIT",
    period: "Nov 2024 – May 2025",
    highlights: [
      "Completed a 6-month intensive Angular track covering TypeScript, RxJS, NgRx state management, reactive forms, and REST API integration",
      "Delivered a capstone single-page application following Angular best practices within a cross-functional Agile team",
      "Earned a certificate accredited by Egypt's Ministry of Communications and Information Technology (MCIT)",
    ],
    color: "var(--glow-secondary)",
  },
  {
    title: "MEAN-Stack Web Development",
    role: "Frontend Trainee",
    org: "National Telecommunication Institute (NTI) / ITIDA",
    location: "Cairo, Egypt",
    authority: "Summer Training",
    period: "Sep 2024 (120 hrs)",
    highlights: [
      "Completed 120 hours of full-stack training covering MongoDB, Express.js, Angular, and Node.js",
      "Architected and deployed a full-stack application with a RESTful Node.js/Express backend and an Angular frontend",
      "Gained skills in freelancing strategy, Agile project management, and professional portfolio development",
    ],
    color: "var(--glow-accent)",
  },
];

const TrainingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".training-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".training-heading", start: "top 80%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateCard = (direction: number) => {
    if (!cardRef.current) return;
    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      x: direction * -100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.set(cardRef.current, { x: direction * 100 });
    tl.to(cardRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const goNext = () => {
    animateCard(1);
    setTimeout(() => setCurrent((p) => (p + 1) % trainings.length), 300);
  };

  const goPrev = () => {
    animateCard(-1);
    setTimeout(() => setCurrent((p) => (p - 1 + trainings.length) % trainings.length), 300);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const t = trainings[current];

  return (
    <section ref={sectionRef} id="training" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary mb-4 block">// LEARNING JOURNEY</span>
          <h2 className="training-heading text-4xl md:text-6xl font-bold">
            Training & <span className="gradient-text">Programs</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={cardRef}
            className="rounded-xl glow-border bg-card/50 backdrop-blur-sm p-8 md:p-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">{t.role}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h3>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: `linear-gradient(135deg, hsl(${t.color}), hsl(${t.color} / 0.3))`,
                  color: "hsl(var(--background))",
                }}
              >
                0{current + 1}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {t.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {t.location}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-mono">{t.authority}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{t.org}</p>

            {/* Highlights */}
            <ul className="space-y-3">
              {t.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goPrev}
              className="magnetic-btn p-3 rounded-full glow-border text-muted-foreground hover:text-foreground transition-colors"
              data-cursor-hover
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {trainings.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    animateCard(i > current ? 1 : -1);
                    setTimeout(() => setCurrent(i), 300);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  data-cursor-hover
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="magnetic-btn p-3 rounded-full glow-border text-muted-foreground hover:text-foreground transition-colors"
              data-cursor-hover
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
