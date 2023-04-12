import React from 'react';
import ProjectCards from '../components/cards/ProjectCards';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhavesh Patil - Projects',
  description:
    'This is a project page that contains all the information about projects that bhavesh has created in past.',
};

const projects = () => {
  return (
    <div className='flex my-4 justify-center  items-center overflow-auto flex-wrap cursor-default h-[100vh-5rem] max-w-full'>
      <div className='overflow-auto h-screen w-full flex flex-wrap justify-center pb-40 lg:pb-20'>
        <ProjectCards />
      </div>
    </div>
  );
};

export default projects;
