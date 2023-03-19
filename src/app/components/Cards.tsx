import Image from 'next/image';
import React from 'react';
import { ProjectsDetails, projectsArr } from '../utils/projectArr';
import Link from 'next/link';

const Card = (project: ProjectsDetails) => {
  return (
    <div className='m-4'>
      <div
        data-theme='business'
        className='card md:w-96 w-64 md:text-lg text-sm bg-base-100 shadow-xl h-96 rounded-3xl hover:drop-shadow-4xl hover:scale-105 '
      >
        <figure className='relative h-96'>
          <Image
            src={project.imgLink}
            alt={project.title}
            // width={1280}
            // height={720}
            fill
          />
        </figure>
        <div className='card-body p-4 md:p-8'>
          <h2 className='card-title font-semibold '>{project.title}</h2>
          <p>{project.description}</p>
          <div className=' mt-2 flex justify-evenly'>
            <Link href={project.previewLink}>
              <div className='card-actions justify-end'>
                <button className='md:btn btn-primary btn-sm rounded-lg md:rounded-2xl '>
                  Preview
                </button>
              </div>
            </Link>
            <Link href={project.githubLink}>
              <div className='card-actions justify-end'>
                <button className='md:btn btn-primary btn-sm rounded-lg md:rounded-2xl'>
                  GitHub
                </button>
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
      {projectsArr.map((project, key) => {
        return (
          <div key={key}>
            <Card {...project} />
          </div>
        );
      })}
    </>
  );
};

export default ProjectCards;
