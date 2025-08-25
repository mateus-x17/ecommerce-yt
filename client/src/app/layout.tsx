import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "../components/Footer";
import NavBar from "../components/navBar";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trendlama - Best Clothes",
  description: "Trendlama is the best place to find the best clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // função recebe o children e componentes de layouts para formar a estrutura base do site (ex: navBar, footer)
    // ajusta a responsividade de todo o site de acordo com o tamanho da tela colocando o children dentro de um container
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-3xl lg:max-w-6xl">
          <NavBar />
          {children}
          <Footer />
          </div>
        <ToastContainer position="bottom-right" /> 
        {/* adc conteiner de menssagem do tastfy */}
      </body>
    </html>
  );
}
