import Introduction from "@/components/indroduction";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhavesh Patil | Home</title>
      </Head>
      <main className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center">
        <Introduction />
      </main>
    </>
  );
}
