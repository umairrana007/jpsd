import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FontLoader } from "@/components/ui/FontLoader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ClientMetadataUpdater from "@/components/ui/ClientMetadataUpdater";

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

import BilingualChatbot from "@/components/BilingualChatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-inter">
        <AuthProvider>
          <LanguageProvider>
            <FontLoader />
            <ClientMetadataUpdater />
            <Navbar />
            <main className="flex-grow pt-24">{children}</main>
            <Footer />
            <BilingualChatbot />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
