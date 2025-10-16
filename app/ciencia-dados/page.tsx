import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  BarChart,
  Cpu,
  Database,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

export default function CienciaDadosPage() {
  const services = [
    {
      icon: BarChart,
      title: "Análise de Dados",
      description:
        "Análise exploratória e descritiva de dados para identificar padrões, tendências e insights acionáveis para o negócio.",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description:
        "Desenvolvimento de modelos preditivos e algoritmos de aprendizado de máquina para automação e tomada de decisão.",
    },
    {
      icon: Cpu,
      title: "Inteligência Artificial",
      description:
        "Pesquisa e implementação de soluções de IA, incluindo deep learning, NLP e visão computacional.",
    },
    {
      icon: TrendingUp,
      title: "Data Visualization",
      description:
        "Criação de dashboards interativos e visualizações de dados com Tableau, Power BI e bibliotecas Python.",
    },
    {
      icon: Database,
      title: "Big Data",
      description:
        "Processamento e análise de grandes volumes de dados usando tecnologias modernas e escaláveis.",
    },
    {
      icon: Lightbulb,
      title: "Consultoria em IA",
      description:
        "Consultoria estratégica para implementação de soluções de IA e ciência de dados em empresas.",
    },
  ];

  const technologies = {
    languages: ["Python", "R", "SQL", "Julia"],
    libraries: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Keras",
    ],
    visualization: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Plotly"],
    tools: ["Jupyter", "Git", "Docker", "Apache Spark", "Airflow"],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
              <Brain className="w-10 h-10 text-accent" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block">Ciência de</span>
            <span className="block text-accent">Dados</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformando dados em insights valiosos através de IA e Machine
            Learning
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas em análise de dados e inteligência artificial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-accent" />
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
              Experiência & Pesquisa
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Atuação profissional e acadêmica em ciência de dados
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Cientista de Dados - EvcomX</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      01/2025 - Atual
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Liderança de projetos de análise de dados e IA
                  </li>
                  <li>
                    • Desenvolvimento de modelos de machine learning
                  </li>
                  <li>
                    • Criação de dashboards e visualizações de dados
                  </li>
                  <li>
                    • Pesquisa e implementação de soluções inovadoras
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Mestrado em Ciência da Computação - UFRGS</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      02/2023 - Atual
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Pesquisa em IA para casas inteligentes
                  </li>
                  <li>
                    • Desenvolvimento de algoritmos de otimização
                  </li>
                  <li>
                    • Machine learning e deep learning
                  </li>
                  <li>
                    • Publicações em conferências internacionais
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Professor - UCS</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      02/2023 - Atual
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Professor de Empreendedorismo
                  </li>
                  <li>
                    • Mentoria de projetos de inovação
                  </li>
                  <li>
                    • Orientação em análise de dados
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tecnologias
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stack completo para ciência de dados e IA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-accent">Linguagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.languages.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-accent">Bibliotecas ML/DL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.libraries.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-accent">Visualização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.visualization.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-accent">Ferramentas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.tools.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
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
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <Lightbulb className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforme Dados em Decisões
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Descubra insights valiosos e otimize seus processos com IA
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="/#contact">
              Solicite uma Consultoria
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
