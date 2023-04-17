import Introduction from './components/introduction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhavesh Patil - Home',
  description:
    "I'm a computer engineering student who enjoys using JavaScript,TypeScript, Next.js, and Tailwind CSS. I am interested about creating dynamic, responsive web applications that provide an excellent user experience.",
};

export default function Home() {
  return (
    <>
      <main className='flex justify-center items-center select-none h-[calc(100%-4rem)] w-full'>
        <Introduction />
      </main>
    </>
  );
}
