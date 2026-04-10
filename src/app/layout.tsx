import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FontLoader } from "@/components/ui/FontLoader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ClientMetadataUpdater from "@/components/ui/ClientMetadataUpdater";
import { getGlobalConfig } from "@/lib/settings";
import React from "react";
import BilingualChatbot from "@/components/BilingualChatbot";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jamiyat Punjabi Saudagran-e-Delhi (JPSD) - Empowering Humanity, Serving the Needy",
  description: "Join us in making a difference in the lives of those who need it most. Jamiyat Punjabi Saudagran-e-Delhi (JPSD) is dedicated to alleviating human suffering and supporting the destitute.",
  keywords: ["welfare", "charity", "donation", "pakistan", "JPSD", "Jamiyat", "zakat", "sadaqah"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getGlobalConfig();
  const fontFamily = config.fontFamily || 'Inter';
  const borderRadius = config.borderRadius || 12;

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
      style={{ 
        '--font-family': fontFamily, 
        '--border-radius': `${borderRadius}px`,
        '--primary-color': config.primaryColor || '#1ea05f',
        '--secondary-color': config.secondaryColor || '#3b82f6',
        '--logo-url': `url(${config.logoUrl || '/logo.png'})`
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-inter">
        <AuthProvider>
          <SiteConfigProvider>
            <LanguageProvider>
              <FontLoader />
              <ClientMetadataUpdater />
              <Navbar navMenu={config.navMenu} logoUrl={config.logoUrl} />
              <main className="flex-grow pt-24">{children}</main>
              <Footer logoUrl={config.logoUrl} />
              <BilingualChatbot />
            </LanguageProvider>
          </SiteConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
