import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import ProjectModal, { type ProjectDetail } from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

const projects: ProjectDetail[] = [
  {
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with cart management, payment integration, and dynamic product filtering.",
    longDescription: "Built a comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, and an intuitive product discovery experience. The platform handles thousands of products with blazing-fast search and filter capabilities.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Stripe"],
    color: "var(--primary)",
    link: "#",
    github: "#",
    features: [
      "Dynamic product filtering & search with debouncing",
      "Shopping cart with persistent state management",
      "Secure checkout flow with Stripe integration",
      "Responsive design optimized for all devices",
    ],
    images: ["Dashboard View", "Product Page", "Cart & Checkout", "Mobile View"],
  },
  {
    title: "Portfolio Dashboard",
    description: "Interactive analytics dashboard with real-time data visualization, custom charts, and responsive design.",
    longDescription: "Designed and developed a feature-rich analytics dashboard that transforms complex datasets into actionable insights through interactive visualizations. Includes real-time data streaming and customizable widget layouts.",
    tags: ["Next.js", "D3.js", "Framer Motion", "API"],
    color: "var(--glow-secondary)",
    link: "#",
    github: "#",
    features: [
      "Real-time data visualization with D3.js",
      "Customizable dashboard widget layout",
      "Data export in multiple formats",
      "Responsive charts adapting to screen size",
    ],
    images: ["Analytics Overview", "Chart Builder", "Data Tables", "Settings"],
  },
  {
    title: "Social Media App",
    description: "Feature-rich social platform with real-time messaging, media uploads, and infinite scroll feeds.",
    longDescription: "Created a full-featured social media application with real-time communication capabilities, media sharing, and an algorithmic feed system. The app supports live notifications and seamless content discovery.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    color: "var(--glow-accent)",
    link: "#",
    github: "#",
    features: [
      "Real-time messaging with Socket.io",
      "Media upload with image optimization",
      "Infinite scroll feed with lazy loading",
      "User profiles with follow/unfollow system",
    ],
    images: ["Feed View", "Chat Interface", "Profile Page", "Explore"],
  },
  {
    title: "Creative Agency Site",
    description: "Award-worthy agency website with scroll-driven animations, 3D elements, and immersive storytelling.",
    longDescription: "Developed an immersive agency website featuring advanced scroll-triggered animations, 3D WebGL elements, and cinematic transitions that tell a compelling brand story while maintaining excellent performance.",
    tags: ["GSAP", "Three.js", "React", "CSS"],
    color: "var(--primary)",
    link: "#",
    github: "#",
    features: [
      "GSAP-powered scroll animations",
      "Three.js 3D interactive elements",
      "Cinematic page transitions",
      "Performance-optimized media loading",
    ],
    images: ["Hero Section", "Case Studies", "Team Page", "Contact"],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".projects-heading", start: "top 80%" } }
      );

      const cards = document.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateY: i % 2 === 0 ? -5 : 5 },
          {
            opacity: 1, y: 0, rotateY: 0, duration: 0.8,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProject = (project: ProjectDetail) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary mb-4 block">// SELECTED WORK</span>
          <h2 className="projects-heading text-4xl md:text-6xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card group rounded-xl overflow-hidden glow-border bg-card/50 backdrop-blur-sm cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => openProject(project)}
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, hsl(${project.color}) 0%, hsl(${project.color} / 0.3) 100%)`,
                }}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute bottom-4 left-6 text-6xl font-bold opacity-10 text-background">
                  0{i + 1}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/20 backdrop-blur-sm text-xs font-mono text-foreground/80">
                  Click to explore →
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-sm text-primary">
                    <ExternalLink size={16} /> Live Demo
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Github size={16} /> Source
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default ProjectsSection;
