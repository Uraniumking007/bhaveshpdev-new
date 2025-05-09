import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
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
        <TransitionProvider>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}