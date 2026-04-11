import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ScrollProgressBar from "../components/ScrollProgressBar";
import LoadingScreen from "../components/LoadingScreen";
import { LanguageProvider } from "../context/LanguageContext";


const heading = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const body = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Sottomonte - Real Estate",
  description: "Luxury real estate in Croatia. Find your perfect property with Sottomonte.",
  icons: {
    icon: "/SottomonteB_NE4.png",
    apple: "/SottomonteB_NE4.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>
        <LanguageProvider>
          <LoadingScreen />
          <ScrollProgressBar />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
