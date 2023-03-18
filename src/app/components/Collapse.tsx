import { useState } from 'react';
import { ProjectsDetails, projectsArr } from '../utils/projectArr';
import Link from 'next/link';

export const Collapse = ({
  title,
  description,
  githubLink,
}: ProjectsDetails) => {
  const [collapseState, setCollapseState] = useState(false);

  return (
    <div
      data-theme='business'
      tabIndex={0}
      onClick={() => {
        setCollapseState(!collapseState);
      }}
      className={`collapse collapse-arrow border drop-shadow-md m-2 border-base-300 bg-base-100 rounded-xl ${
        collapseState
          ? 'bg-secondary text-secondary-content'
          : 'collapse-close bg-primary text-primary-content'
      }`}
    >
      <div className='collapse-title text-xl font-medium'>{title}</div>
      <div className='collapse-content'>
        <p>{description}</p>
        <Link href={githubLink}>
          <button>Github</button>
        </Link>
      </div>
    </div>
  );
};

const CollapseProjects = () => {
  return (
    <>
      {projectsArr.map((project, key) => {
        return (
          <div key={key}>
            <Collapse
              githubLink={project.githubLink}
              title={project.title}
              description={project.description}
              imgLink={project.imgLink}
              previewLink={project.previewLink}
              warning={project.warning}
            />
          </div>
        );
      })}
    </>
  );
};

export default CollapseProjects;
