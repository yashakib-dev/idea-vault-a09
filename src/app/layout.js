import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/ThemeProvider";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
});

export const metadata = {
  title: {
    default: "IdeaVault",
    template: "%s | IdeaVault",
  },
  description:
    "IdeaVault is a web-based platform where users can share innovative startup ideas",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceCodePro.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-[#0B0B0B] dark:text-white bg-[#F4F9FD] text-black">
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
