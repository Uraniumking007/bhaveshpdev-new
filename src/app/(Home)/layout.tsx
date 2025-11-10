import NavBar from "@/components/navbar";
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
    <>
      <NavBar />
      {children}
    </>
  );
}
