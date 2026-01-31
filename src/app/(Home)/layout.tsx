import NavBar from "@/components/navbar";
import { HomeBackgroundEffects } from "@/components/home-background-effects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: ["/favicon.ico"],
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <NavBar />
      {children}
      <HomeBackgroundEffects />
    </div>
  );
}
