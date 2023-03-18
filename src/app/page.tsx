'use client';
import CollapseProjects from './components/Collapse';

export default function Home() {
  return (
    <main className='flex justify-center p-2'>
      <div className='p-25'>
        <CollapseProjects />
      </div>
    </main>
  );
}
