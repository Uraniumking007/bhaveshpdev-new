import { type ProjectsDetails, projectsArr } from "@/utils/data";
import Link from "next/link";

export const Collapse = ({
  title,
  description,
  githubLink,
}: ProjectsDetails) => {
  return (
    <div
      tabIndex={0}
      className=" collapse collapse-arrow rounded-box mx-auto w-[70%] border border-base-300 bg-base-100"
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
    <div className="flex w-full flex-col justify-center">
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
