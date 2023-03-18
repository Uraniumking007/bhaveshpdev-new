import Image from 'next/image';
import React from 'react';
import { ProjectsDetails, projectsArr } from '../utils/projectArr';
import Link from 'next/link';

const Card = (project: ProjectsDetails) => {
  return (
    <div className='m-4'>
      <div
        data-theme='business'
        className='card w-96 bg-base-100 shadow-xl h-96 rounded-3xl hover:drop-shadow-4xl hover:scale-105 '
      >
        <figure>
          <Image
            src={project.imgLink}
            alt={project.title}
            width={1280}
            height={720}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{project.title}</h2>
          <p>{project.description}</p>
          <div className=' mt-2 flex justify-evenly'>
            <Link href={project.previewLink}>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary rounded-2xl '>
                  Preview
                </button>
              </div>
            </Link>
            <Link href={project.githubLink}>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary rounded-2xl'>GitHub</button>
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
