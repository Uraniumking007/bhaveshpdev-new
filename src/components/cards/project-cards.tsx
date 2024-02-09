import { projectsArr } from "@/utils/data";
import Cards from "@/components/cards/cards";
import { api } from "@/utils/api";
import Loading from "../loading";

const ProjectCards = () => {
  const { data, error, isLoading, isFetched } =
    api.example.getProjects.useQuery(undefined, {
      staleTime: 100 * 60 * 60,
    });

  if (isLoading) {
    return <Loading />;
  }
  if (!isFetched) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="m-4 flex flex-wrap justify-evenly gap-4">
        {data.projects.map((project, key) => {
          return (
            <div key={key}>
              <Cards {...project} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProjectCards;
