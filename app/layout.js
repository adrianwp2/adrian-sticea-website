import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const InterSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Full-Stack Developer Ready to Build",
  description:
    "Experienced developer who transforms ideas into powerful digital solutions. From custom websites to SaaS applications, I deliver results that drive business growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="	top-center" />
        <Footer />
      </body>
    </html>
  );
}
