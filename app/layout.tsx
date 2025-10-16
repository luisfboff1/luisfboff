import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Luis Fernando Boff - Desenvolvedor & Engenheiro",
  description:
    "Desenvolvedor Full Stack, Engenheiro, Especialista em IA e Ciência de Dados. Transformando ideias em soluções tecnológicas inovadoras.",
  keywords: [
    "desenvolvedor",
    "engenheiro",
    "ciência de dados",
    "energia solar",
    "full stack",
    "React",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/images/favicon-v3-code-brackets-64x64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-v3-code-brackets-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-v3-code-brackets-16x16.png"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/images/favicon-v3-code-brackets.ico"
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
