import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
});


export const metadata = {
  title: "IdeaVault - Startup Idea Sharing Platform",
  description: "IdeaVault is a web-based platform where users can share innovative startup ideas",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-theme="light"
      className={`${sourceCodePro.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        <Toaster />
      </body>
    </html>
  );
}
