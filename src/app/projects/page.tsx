import React from 'react';
import ProjectCards from '../components/Cards';

const projects = () => {
  return (
    <div className='flex select-none h-[calc(100%-4rem)] w-full'>
      <div className='flex m-20 flex-wrap justify-evenly'>
        <ProjectCards />
      </div>
    </div>
  );
};

export default projects;
