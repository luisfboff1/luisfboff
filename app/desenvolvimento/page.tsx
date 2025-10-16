import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Globe,
  Smartphone,
  Server,
  Database,
  Cloud,
  ArrowRight,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function DesenvolvimentoPage() {
  const technologies = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vue.js",
      "HTML5",
      "CSS3",
    ],
    backend: [
      "Node.js",
      "Python",
      "PHP",
      "Express",
      "FastAPI",
      "Django",
      "Laravel",
    ],
    mobile: ["React Native", "Flutter", "Expo", "Android", "iOS"],
    cloud: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Vercel"],
    database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Code className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block">Desenvolvimento</span>
            <span className="block text-primary">Full Stack</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformando ideias em soluções digitais completas com as
            tecnologias mais modernas do mercado
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas para todas as suas necessidades digitais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Desenvolvimento Web</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sites e aplicações web responsivas, rápidas e otimizadas para
                  SEO. Utilizando React, Next.js e as melhores práticas do
                  mercado.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Desenvolvimento Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aplicativos nativos e híbridos para iOS e Android. React
                  Native e Flutter para máxima performance e experiência do
                  usuário.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Server className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Backend & APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  APIs RESTful e GraphQL robustas e escaláveis. Node.js, Python
                  e PHP para soluções backend de alta performance.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Banco de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Modelagem e otimização de bancos de dados SQL e NoSQL.
                  PostgreSQL, MongoDB, MySQL e Redis para máxima eficiência.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Cloud & DevOps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deploy e gerenciamento em nuvem. AWS, Azure, Docker e
                  Kubernetes para infraestrutura escalável e confiável.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Consultoria Técnica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Análise de código, arquitetura de software e melhores
                  práticas. Orientação técnica para projetos de qualquer porte.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tecnologias
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stack completo para desenvolvimento moderno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.frontend.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.backend.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.mobile.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Cloud & DevOps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.cloud.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Banco de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.database.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar seu projeto?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Entre em contato e vamos transformar sua ideia em realidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/#contact">
                Entre em Contato
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/luisfboff1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2" />
                Ver Projetos no GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
