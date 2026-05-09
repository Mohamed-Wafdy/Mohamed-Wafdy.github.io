import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const trailCount = 5;
    const trails: HTMLDivElement[] = [];

    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div");
      trail.className = "fixed pointer-events-none z-[9998] rounded-full border border-primary/20";
      trail.style.width = `${20 + i * 6}px`;
      trail.style.height = `${20 + i * 6}px`;
      trail.style.opacity = `${0.3 - i * 0.05}`;
      document.body.appendChild(trail);
      trails.push(trail);
    }
    cursorTrailsRef.current = trails;

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: "power2.out",
      });

      trails.forEach((trail, i) => {
        gsap.to(trail, {
          x: e.clientX - (10 + i * 3),
          y: e.clientY - (10 + i * 3),
          duration: 0.3 + i * 0.1,
          ease: "power2.out",
        });
      });

      // Update magnetic buttons
      const target = e.target as HTMLElement;
      const magneticEl = target.closest(".magnetic-btn");
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        (magneticEl as HTMLElement).style.setProperty("--mouse-x", `${(relX / rect.width) * 100}%`);
        (magneticEl as HTMLElement).style.setProperty("--mouse-y", `${(relY / rect.height) * 100}%`);
      }
    };

    const onMouseEnterInteractive = () => {
      isHovering = true;
      gsap.to(cursor, { scale: 1.8, borderColor: "hsl(170 80% 50% / 0.8)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      isHovering = false;
      gsap.to(cursor, { scale: 1, borderColor: "hsl(170 80% 50% / 0.4)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, .magnetic-btn, [data-cursor-hover]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      trails.forEach((trail) => trail.remove());
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/40 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
};

export default CustomCursor;
