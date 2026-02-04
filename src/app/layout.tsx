import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
import PageTransitionWrapper from "@/components/wrapper/PageTransitionWrapper";
import { TransitionProvider } from "@/lib/context/TransitionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: ["/favicon.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full min-h-screen overflow-x-hidden dark`}
      >
        <Script
          src="https://analytics.bhaveshp.dev/script.js"
          data-website-id="711e7bc2-cee7-4f07-bae4-f8cb22c643f4"
          strategy="afterInteractive"
        />
        <TransitionProvider>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}