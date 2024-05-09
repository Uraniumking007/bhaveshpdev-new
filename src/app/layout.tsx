import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { Metadata } from "next";

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
      <body className={`${inter.className} w-screen h-screen dark`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
