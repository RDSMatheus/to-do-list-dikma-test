import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBarComponent from "@/components/sidebar-component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lista de tarefas",
  description: "Lista de tarefas para o teste técnico do grupo dikma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <SideBarComponent />
          {children}
        </div>
      </body>
    </html>
  );
}
