import React from 'react';
import ProjectCards from '../components/Cards';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhavesh Patil - Projects',
  description:
    "This is a project page that contains all the information about projects that i've created in past.",
};

const projects = () => {
  return (
    <div className='flex select-none h-[calc(100%-4rem)] max-w-full'>
      <div className='flex mt-20 flex-wrap justify-evenly'>
        <ProjectCards />
      </div>
    </div>
  );
};

export default projects;
