import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const InterSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Full-Stack Developer Ready to Build",
  description:
    "Experienced developer who transforms ideas into powerful digital solutions. From custom websites to SaaS applications, I deliver results that drive business growth.",
  openGraph: {
    title: "Full-Stack Developer Ready to Build",
    description:
      "Experienced developer who transforms ideas into powerful digital solutions. From custom websites to SaaS applications, I deliver results that drive business growth.",
    images: [
      {
        url: "/images/me.webp", // Change this to your preferred image
        width: 1200,
        height: 630,
        alt: "Full-Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Developer Ready to Build",
    description:
      "Experienced developer who transforms ideas into powerful digital solutions. From custom websites to SaaS applications, I deliver results that drive business growth.",
    images: ["/images/me.webp"], // Change this to your preferred image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="	top-center" />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
