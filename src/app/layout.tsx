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
          data-website-id="b342d5fa-f525-4014-a97e-b2a1978f55d0"
          strategy="afterInteractive"
        />
        <TransitionProvider>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}