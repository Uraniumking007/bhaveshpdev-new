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
    <div className='flex my-4 cursor-default h-full max-w-full'>
      <ProjectCards />
    </div>
  );
};

export default projects;
