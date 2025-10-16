"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Sun,
  Brain,
  User,
  ArrowDown,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const texts = [
    "Escolha sua área de interesse",
    "Ready to build the future",
    "Creating amazing solutions",
  ];
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = texts[textIndex];
        if (!isDeleting) {
          setTypedText(currentText.substring(0, typedText.length + 1));
          if (typedText === currentText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setTypedText(currentText.substring(0, typedText.length - 1));
          if (typedText === "") {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90">
          <div className="absolute inset-0">
            {/* Floating elements */}
            <div className="absolute top-20 left-10 text-4xl text-primary/20 animate-[float_6s_ease-in-out_infinite]">
              {"{"}
              {"}"}
            </div>
            <div className="absolute top-40 right-20 text-4xl text-secondary/20 animate-[float_7s_ease-in-out_infinite_0.5s]">
              &lt;/&gt;
            </div>
            <div className="absolute bottom-40 left-20 text-4xl text-accent/20 animate-[float_8s_ease-in-out_infinite_1s]">
              AI
            </div>
            <div className="absolute bottom-20 right-40 text-4xl text-primary/20 animate-[float_9s_ease-in-out_infinite_1.5s]">
              ML
            </div>
            <div className="absolute top-60 right-60 text-4xl text-secondary/20 animate-[float_7s_ease-in-out_infinite_2s]">
              ⚡
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="block">Luis Fernando</span>
                <span className="block">Boff</span>
                <span className="block text-primary">Portfolio</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Explore as diferentes áreas de atuação
                <br />
                <span className="text-primary font-mono">Desenvolvimento</span> •{" "}
                <span className="text-secondary font-mono">Energia Solar</span> •{" "}
                <span className="text-accent font-mono">Ciência de Dados</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/sobre">
                    <User className="mr-2" />
                    Sobre Mim
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#specializations">
                    <ArrowDown className="mr-2" />
                    Ver Especializações
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-[glow_3s_ease-in-out_infinite]" />
                <div className="relative rounded-full overflow-hidden border-4 border-primary w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/images/luis-removebg-preview.png"
                    alt="Luis Fernando Boff"
                    width={320}
                    height={320}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Terminal */}
              <Card className="w-full max-w-md bg-muted/50 border-primary/20 font-mono text-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground text-xs">
                      Luis@portfolio:
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="text-primary">$</span>{" "}
                    <span className="text-foreground">ls especializacoes/</span>
                  </div>
                  <div className="text-muted-foreground pl-4">
                    desenvolvimento/
                    <br />
                    energia-solar/
                    <br />
                    ciencia-dados/
                  </div>
                  <div>
                    <span className="text-primary">$</span>{" "}
                    <span className="text-foreground">echo "{typedText}"</span>
                    <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-primary ml-0.5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section id="specializations" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Especializações
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore as diferentes áreas de atuação do Luis Fernando Boff
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Desenvolvimento */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Desenvolvimento Full Stack com React, Node.js, Python e muito
                  mais
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Frontend: React, Next.js, TypeScript</li>
                  <li>• Backend: Node.js, Python, PHP</li>
                  <li>• Mobile: React Native, Flutter</li>
                  <li>• Cloud: AWS, Azure, Docker</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/desenvolvimento">
                    Ver Desenvolvimento
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Energia Solar */}
            <Card className="group hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Sun className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle>Energia Solar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Projetos fotovoltaicos e soluções sustentáveis em energia
                  renovável
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mais de 70 projetos aprovados</li>
                  <li>• 4 concessionárias aprovadas</li>
                  <li>• Ferramentas: AutoCAD, PVSyst</li>
                  <li>• Análises de viabilidade</li>
                </ul>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                  <Link href="/energia-solar">
                    Ver Energia Solar
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Ciência de Dados */}
            <Card className="group hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Brain className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Ciência de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Análise de dados, IA e Machine Learning para insights
                  valiosos
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Python, R, SQL, Pandas</li>
                  <li>• TensorFlow, PyTorch</li>
                  <li>• Tableau, Power BI</li>
                  <li>• Pesquisa em IA</li>
                </ul>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/ciencia-dados">
                    Ver Ciência de Dados
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-muted-foreground">
              Pronto para transformar sua ideia em realidade?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:luisfboff@hotmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  luisfboff@hotmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  linkedin.com/in/luis-fernando-boff
                </a>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">GitHub</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://github.com/luisfboff1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  github.com/luisfboff1
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
