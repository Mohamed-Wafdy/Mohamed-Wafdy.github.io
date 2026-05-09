import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, Github } from "lucide-react";

export interface ProjectDetail {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  link: string;
  github: string;
  features: string[];
  images: string[];
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{project.description}</DialogDescription>
        </DialogHeader>

        {/* Image gallery */}
        <div className="grid grid-cols-2 gap-3 my-4">
          {project.images.map((img, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden aspect-video"
              style={{
                background: `linear-gradient(135deg, hsl(${project.color}) 0%, hsl(${project.color} / 0.2) 100%)`,
              }}
            >
              <div className="w-full h-full grid-bg opacity-30 flex items-center justify-center">
                <span className="text-xs font-mono text-muted-foreground">{img}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Long description */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
            <ul className="space-y-1">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href={project.link}
              className="magnetic-btn flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              data-cursor-hover
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <a
              href={project.github}
              className="magnetic-btn flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-semibold hover:border-primary/50 transition-colors"
              data-cursor-hover
            >
              <Github size={16} /> Source Code
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
