import NavBar from "@/components/navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
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
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
