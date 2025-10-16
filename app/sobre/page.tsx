import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Briefcase,
  Award,
  Target,
  Zap,
  Sun,
  Code,
  BookOpen,
} from "lucide-react";

export default function SobrePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-muted/30 to-background">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="block">Sobre</span>
                <span className="block">Luis Fernando</span>
                <span className="block text-primary">Boff</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A jornada épica de um engenheiro que se tornou
                <br />
                <span className="text-primary font-mono">
                  cientista de dados
                </span>{" "}
                e{" "}
                <span className="text-secondary font-mono">
                  desenvolvedor full stack
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-[glow_3s_ease-in-out_infinite]" />
                <div className="relative rounded-full overflow-hidden border-4 border-primary w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/images/luis-removebg-preview.png"
                    alt="Luis Fernando Boff"
                    width={320}
                    height={320}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Minha História
            </h2>
            <p className="text-xl text-muted-foreground">
              Da engenharia à ciência de dados: uma trajetória de inovação
            </p>
          </div>

          <div className="space-y-8">
            {/* 2016 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>🚀 Primeiro Contato</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      DataBoff (07/2016)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estagiário - Primeiro contato com programação, suporte ao
                  cliente e resolução de problemas básicos
                </p>
              </CardContent>
            </Card>

            {/* 2018 */}
            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Sun className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle>⚡ Energia & Sustentabilidade</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Petinelli Inc. (09/2018 - 09/2020)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estagiário em projetos elétricos, certificação LEED e sistemas
                  fotovoltaicos. Domínio de AutoCAD, PVSyst e análises de
                  viabilidade
                </p>
              </CardContent>
            </Card>

            {/* 2021 */}
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>🏗️ Engenheiro Autônomo</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Projetista Independente (06/2021 - Atual)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mais de 70 projetos fotovoltaicos aprovados. Especialista em
                  geração distribuída, autoconsumo remoto e análises financeiras
                </p>
              </CardContent>
            </Card>

            {/* 2023 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>🎓 Professor & Pesquisador</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      UCS & UFRGS (02/2023 - Atual)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professor de Empreendedorismo na UCS. Mestrado em UFRGS
                  desenvolvendo IA para casas inteligentes com ML e otimização
                </p>
              </CardContent>
            </Card>

            {/* 2025 */}
            <Card className="border-l-4 border-l-primary bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>📊 Cientista de Dados</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      EvcomX (01/2025 - Atual)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Liderando projetos de análise de dados, desenvolvimento de
                  aplicações e pesquisa em IA
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    Cientista de Dados
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    Desenvolvedor Full Stack
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                    Engenheiro Solar
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                    Professor & Pesquisador
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">70+</div>
              <div className="text-muted-foreground">Projetos Fotovoltaicos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">9+</div>
              <div className="text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Tecnologias Dominadas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">4</div>
              <div className="text-muted-foreground">
                Concessionárias Aprovadas
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
