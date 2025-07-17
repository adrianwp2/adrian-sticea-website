import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const InterSans = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "Building in Public to Become a Better Engineer",
    description:
        " I'm Adrian — a developer learning by building real products. Follow along, see what I'm working on.",
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
