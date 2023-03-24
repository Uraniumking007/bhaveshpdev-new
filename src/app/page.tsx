'use client';
import Head from 'next/head';
import Introduction from './components/introduction';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhavesh Patil - Home</title>
      </Head>
      <main className='flex justify-center items-center select-none h-[calc(100%-4rem)] w-full'>
        <Introduction />
        {/* <CollapseProjects /> */}
      </main>
    </>
  );
}
