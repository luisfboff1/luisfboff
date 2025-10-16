import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Zap,
  TrendingUp,
  Award,
  FileCheck,
  Calculator,
  ArrowRight,
  Leaf,
} from "lucide-react";
import Link from "next/link";

export default function EnergiaSolarPage() {
  const services = [
    {
      icon: FileCheck,
      title: "Projetos Fotovoltaicos",
      description:
        "Desenvolvimento completo de projetos de geração distribuída, desde o dimensionamento até a aprovação na concessionária.",
    },
    {
      icon: Calculator,
      title: "Análise de Viabilidade",
      description:
        "Estudos detalhados de viabilidade técnica e financeira, com análise de ROI e payback do investimento.",
    },
    {
      icon: Award,
      title: "Certificações",
      description:
        "Experiência com certificação LEED e normas de sustentabilidade em edificações e projetos elétricos.",
    },
    {
      icon: TrendingUp,
      title: "Consultoria Energética",
      description:
        "Consultoria especializada em otimização de consumo e estratégias de geração de energia renovável.",
    },
  ];

  const stats = [
    { value: "70+", label: "Projetos Aprovados" },
    { value: "4", label: "Concessionárias" },
    { value: "5+", label: "Anos de Experiência" },
    { value: "100%", label: "Taxa de Aprovação" },
  ];

  const tools = [
    "AutoCAD",
    "PVSyst",
    "PVSOL",
    "SketchUp",
    "Excel",
    "Project",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6">
              <Sun className="w-10 h-10 text-secondary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block">Energia</span>
            <span className="block text-secondary">Solar</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Projetos fotovoltaicos profissionais e soluções sustentáveis em
            energia renovável
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas em energia solar fotovoltaica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experiência
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Histórico profissional em energia solar
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Sun className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle>Projetista Independente</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      06/2021 - Atual
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Mais de 70 projetos fotovoltaicos aprovados</li>
                  <li>
                    • Especialista em geração distribuída e autoconsumo remoto
                  </li>
                  <li>• Aprovações em 4 concessionárias diferentes</li>
                  <li>• Análises financeiras e de viabilidade</li>
                  <li>• Dimensionamento e otimização de sistemas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle>Petinelli Inc.</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      09/2018 - 09/2020
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Estagiário em projetos elétricos e fotovoltaicos</li>
                  <li>• Certificação LEED e sustentabilidade</li>
                  <li>• Domínio de AutoCAD e PVSyst</li>
                  <li>• Análises de viabilidade técnica e financeira</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ferramentas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnologias utilizadas nos projetos
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-6 py-3 rounded-full bg-secondary/20 text-secondary text-lg font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
            <Leaf className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Invista em Energia Limpa
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Reduza seus custos e contribua para um futuro mais sustentável
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
            <Link href="/#contact">
              Solicite um Orçamento
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
