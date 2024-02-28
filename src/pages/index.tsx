import Introduction from "@/components/indroduction";
import PageTransitions from "@/components/page-transitions";
import Head from "next/head";
import { type ForwardedRef } from "react";

export default function Home(_: unknown, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <PageTransitions ref={ref}>
      <Head>
        <title>Bhavesh Patil | Home</title>
      </Head>
      <main className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center">
        <Introduction />
      </main>
    </PageTransitions>
  );
}
