import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactQueryProvider } from "@/lib/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Product Roadmap",
    template: "%s | Product Roadmap",
  },
  description: "Follow the progress of your product roadmap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-navy-950 text-navy-50 antialiased">
        <ReactQueryProvider>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
