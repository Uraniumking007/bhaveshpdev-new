import { useState } from "react";
import { ProjectsDetails, projectsArr } from "../../utils/projectArr";
import Link from "next/link";

export const Collapse = ({
  title,
  description,
  githubLink,
}: ProjectsDetails) => {
  return (
    <div
      tabIndex={0}
      className=" mx-auto collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-[70%]"
    >
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        <p>{description}</p>
        <Link href={githubLink}>
          <button className="btn">github</button>
        </Link>
      </div>
    </div>
  );
};

const CollapseProjects = () => {
  return (
    <div className="flex flex-col justify-center w-full">
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
    </div>
  );
};

export default CollapseProjects;
