'use client';
import Introduction from './components/introduction';

export default function Home() {
  return (
    <main className='flex justify-center items-center select-none h-[calc(100%-4rem)] w-full'>
      <Introduction />
      {/* <CollapseProjects /> */}
    </main>
  );
}
