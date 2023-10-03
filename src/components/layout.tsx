import BrandNewHeader from "./header";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-full overflow-hidden">
      <BrandNewHeader />

      {children}
    </main>
  );
}
