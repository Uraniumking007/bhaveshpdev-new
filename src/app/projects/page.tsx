import React from 'react';
import ProjectCards from '../components/Cards';
import Head from 'next/head';

const projects = () => {
  return (
    <>
      <Head>
        <title>Bhavesh Patil - Projects</title>
      </Head>
      <main>
        <div className='flex select-none h-[calc(100%-4rem)] w-full'>
          <div className='flex m-20 flex-wrap justify-evenly'>
            <ProjectCards />
          </div>
        </div>
      </main>
    </>
  );
};

export default projects;
