import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".contact-heading", start: "top 80%" } }
      );

      gsap.fromTo(".contact-form",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".contact-form", start: "top 85%" } }
      );

      gsap.fromTo(".contact-info-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.15,
          scrollTrigger: { trigger: ".contact-info", start: "top 85%" },
        }
      );

      // Big text marquee
      gsap.to(".marquee-text", {
        xPercent: -50,
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Marquee */}
      <div className="overflow-hidden mb-20 -mx-6">
        <div className="marquee-text whitespace-nowrap text-[8rem] md:text-[12rem] font-bold text-muted/30 select-none leading-none">
          LET'S WORK TOGETHER • LET'S WORK TOGETHER • LET'S WORK TOGETHER •&nbsp;
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="contact-info">
            <span className="text-sm font-mono text-primary mb-4 block">// GET IN TOUCH</span>
            <h2 className="contact-heading text-4xl md:text-6xl font-bold mb-8">
              Let's build
              <br />
              <span className="gradient-text">something great</span>
            </h2>

            <div className="space-y-6">
              <div className="contact-info-item flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg glow-border bg-card/50 flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-mono">Email</p>
                  <p className="text-foreground">mohamedwafdy2004@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors font-mono"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors font-mono"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors font-mono resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="magnetic-btn w-full px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-box flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
