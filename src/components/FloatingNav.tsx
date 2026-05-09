import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Training", href: "#training" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const FloatingNav = () => {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
    );

    navItems.forEach(({ href }) => {
      const id = href.replace("#", "");
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full glow-border bg-background/80 backdrop-blur-xl max-w-[95vw]"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="magnetic-btn px-3 py-2 text-sm font-bold text-primary font-mono whitespace-nowrap"
          data-cursor-hover
        >
          MWA
        </button>
        <div className="w-px h-5 bg-border" />

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`magnetic-btn px-3 py-2 rounded-full text-sm font-mono transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-cursor-hover
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden magnetic-btn p-2 text-foreground"
          data-cursor-hover
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="w-px h-5 bg-border" />
        <ThemeToggle />
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 py-3 px-4 rounded-2xl glow-border bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default FloatingNav;
