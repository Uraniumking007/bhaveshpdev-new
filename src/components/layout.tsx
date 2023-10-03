import BrandNewHeader from "./header";

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
