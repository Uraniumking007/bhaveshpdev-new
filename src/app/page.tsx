'use client';
import CollapseProjects from './components/Collapse';
import Introduction from './components/introduction';

export default function Home() {
  return (
    <main className='flex justify-center p-2'>
      <div className='p-25'>
        <Introduction />
        <CollapseProjects />
      </div>
    </main>
  );
}
