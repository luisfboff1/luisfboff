import Link from "next/link";
import { Github, Linkedin, Twitter, Heart, Coffee } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Luis Fernando Boff. Todos os direitos
              reservados.
            </p>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1 mt-1">
              Construído com <Heart className="w-4 h-4 text-destructive" /> e
              muito café <Coffee className="w-4 h-4 text-secondary" />
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/luisfboff1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
