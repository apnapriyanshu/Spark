import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spark AI Builder - Open Source Multi-Agent AI Development System",
  description: "Build production-ready software with 9 specialized AI agents powered by 32+ LLMs. 70% Chinese models for 10x cost optimization. Free & Open Source.",
  keywords: ["Spark AI", "AI Builder", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React", "DeepSeek", "Qwen", "Kimi", "GLM", "Multi-Agent"],
  authors: [{ name: "Spark AI Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Spark AI Builder - Open Source Multi-Agent AI System",
    description: "Build production-ready software with AI agents. 32+ LLMs, 70% Chinese models for cost optimization.",
    url: "https://github.com/apnapriyanshu/Spark",
    siteName: "Spark AI Builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark AI Builder",
    description: "Open Source Multi-Agent AI Development System with 32+ LLMs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
