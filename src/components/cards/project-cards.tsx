import { projectsArr } from "@/utils/data";
import Cards from "@/components/cards/cards";

const ProjectCards = () => {
  return (
    <>
      {/* <div className='flex flex-wrap justify-evenly gap-4 m-4'> */}
      {projectsArr.map((project, key) => {
        return (
          <div key={key}>
            <Cards
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
      {/* </div> */}
    </>
  );
};

export default ProjectCards;
