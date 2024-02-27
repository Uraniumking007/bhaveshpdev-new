import BrandNewHeader from "./header";
import { PageTransitionLayout } from "./page-transitions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitionLayout>
      <main className="h-screen w-full overflow-hidden">
        <BrandNewHeader />
        {children}
      </main>
    </PageTransitionLayout>
  );
}
