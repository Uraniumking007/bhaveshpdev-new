import Introduction from './components/introduction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhavesh Patil - Home',
  description: 'This is a home page it contains information about me.',
};

export default function Home() {
  return (
    <>
      <main className='flex justify-center items-center select-none h-[calc(100%-4rem)] w-full'>
        <Introduction />
        {/* <CollapseProjects /> */}
      </main>
    </>
  );
}
