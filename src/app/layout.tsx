import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { NavigationProgress } from "@/components/globals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookly - Agende serviços com facilidade",
  description:
    "Agende horários em salões de beleza, barbearias, clínicas e muito mais com a Bookly. Descubra profissionais, veja disponibilidade em tempo real e reserve em poucos cliques.",
  keywords: [
    "Bookly",
    "agendamento online",
    "salão de beleza",
    "barbearia",
    "clínicas",
    "profissionais",
    "serviços",
    "marcar horário",
    "agenda digital",
  ],
  authors: [{ name: "Victor Hugo" }],
  creator: "Bookly",
  openGraph: {
    title: "Bookly - Agende serviços com facilidade",
    description:
      "Descubra profissionais e agende serviços em salões, barbearias, clínicas e muito mais com a Bookly.",
    // url: "https://bookly.com", // substitua pela URL real quando tiver
    siteName: "Bookly",
    // images: [
    //   {
    //     url: "/images/og-image.jpg", // crie uma imagem preview para redes sociais
    //     width: 1200,
    //     height: 630,
    //     alt: "Bookly - Sistema de agendamento online",
    //   },
    // ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <Providers>
            {children}
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
