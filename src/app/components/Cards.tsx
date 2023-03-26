'use client';

import Image from 'next/image';
import React from 'react';
import { ProjectsDetails, projectsArr } from '../utils/projectArr';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

const Cardss = (project: ProjectsDetails) => {
  return (
    <div className='m-2 md:m-4'>
      <div
        data-theme='business'
        className='card md:w-96 w-64 md:text-lg text-sm bg-base-100 shadow-xl h-96 rounded-3xl hover:drop-shadow-4xl duration-150 ease-in-out hover:scale-105'
      >
        <figure className='relative md:h-56'>
          <Image
            src={project.imgLink}
            alt={project.title}
            width={1280}
            height={720}
            // fill
            className='h-full w-full'
          />
        </figure>
        <div className='card-body p-4 md:p-8'>
          <h2 className='card-title font-semibold '>{project.title}</h2>
          <p>{project.description}</p>
          <div className=' mt-2 flex justify-evenly'>
            <Link href={project.previewLink}>
              <div className='card-actions justify-end'>
                <Button className='btn rounded-2xl bg-neutral shadow-none hover:shadow-md hover:shadow-base-300 hover:bg-neutral-focus active:bg-neutral-focus text-neutral-content'>
                  Preview
                </Button>
              </div>
            </Link>
            <Link href={project.githubLink}>
              <div className='card-actions justify-end'>
                <Button className='btn rounded-2xl bg-neutral shadow-none hover:shadow-md hover:shadow-base-300 hover:bg-neutral-focus active:bg-neutral-focus text-neutral-content'>
                  GitHub
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCards = () => {
  return (
    <>
      <div className='flex flex-wrap justify-evenly gap-4 m-4'>
        {projectsArr.map((project, key) => {
          return (
            <div key={key}>
              <Cardss {...project} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProjectCards;
