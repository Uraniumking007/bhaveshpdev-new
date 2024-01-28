import { api } from "@/utils/api";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import ProjectInput from "./projectInput";

interface ProjectData {
  title: string;
  description: string;
  githubLink: string;
  projectLink: string;
  imageLink: string;
  projectStarted: string;
  projectFinished?: string;
  languages: string[];
  isCompleted: boolean;
}

const EditProjectModal = ({
  openProjectModal,
  setOpenProjectModal,
  id,
}: {
  openProjectModal: boolean;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const handleProjectModal = () => setOpenProjectModal(!openProjectModal);

  const { mutate } = api.example.updateProject.useMutation();

  const [projectData, setProjectData] = React.useState<ProjectData>({
    title: "",
    description: "",
    githubLink: "",
    imageLink: "",
    projectLink: "",
    projectStarted: Date.now().toString(),
    projectFinished: Date.now().toString(),
    languages: [],
    isCompleted: false,
  });

  const { data, error, isFetched } = api.example.getOneProject.useQuery({
    id,
  });
  useEffect(() => {
    if (data) {
      const {
        name,
        description,
        github,
        image,
        link,
        projectInitiated,
        projectCompleted,
        tech,
        isCompleted,
      } = data.project;

      setProjectData({
        title: name,
        description,
        githubLink: github,
        imageLink: image,
        projectLink: link,
        projectStarted: projectInitiated.toISOString(),
        projectFinished: projectCompleted ? projectCompleted.toISOString() : "",
        languages: tech,
        isCompleted,
      });
    }
  }, [data]);

  if (error) {
    console.log(error);
  }
  if (!isFetched) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <Dialog handler={handleProjectModal} open={openProjectModal}>
        <DialogHeader>Create Project</DialogHeader>
        <DialogBody>
          <div className="flex  flex-col gap-5">
            <ProjectInput
              label="Title"
              type="text"
              value={projectData.title}
              onChange={(e) => {
                setProjectData({ ...projectData, title: e.target.value });
              }}
            />
            <ProjectInput
              type="text"
              label="Description"
              value={projectData.description}
              onChange={(e) => {
                setProjectData({ ...projectData, description: e.target.value });
              }}
            />
            <ProjectInput
              type="url"
              value={projectData.projectLink}
              label="Project Link"
              onChange={(e) => {
                setProjectData({ ...projectData, projectLink: e.target.value });
              }}
            />{" "}
            <ProjectInput
              type="url"
              label="GitHub Link"
              value={projectData.githubLink}
              onChange={(e) => {
                setProjectData({ ...projectData, githubLink: e.target.value });
              }}
            />
            <ProjectInput
              type="url"
              label="Image Link"
              value={projectData.imageLink}
              onChange={(e) => {
                setProjectData({ ...projectData, imageLink: e.target.value });
              }}
            />
            <ProjectInput
              type="date"
              label="Project Started"
              value={projectData.projectStarted}
              onChange={(e) => {
                const d = new Date(e.target.value);
                setProjectData({
                  ...projectData,
                  projectStarted: d.toISOString(),
                });
              }}
            />
            <Checkbox
              crossOrigin={""}
              label="Completed"
              // value={projectData.isCompleted}
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  isCompleted: e.target.checked,
                });
              }}
            />
            <Input
              crossOrigin=""
              type="date"
              label="Project Finished"
              disabled={!projectData.isCompleted}
              defaultValue={projectData.projectFinished}
              onChange={(e) => {
                const d = e.target.valueAsDate!;
                setProjectData({
                  ...projectData,
                  projectFinished: d.toISOString(),
                });
              }}
            />
            <ProjectInput
              type="text"
              label="Languages"
              value={projectData.languages.join(",")}
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  languages: e.target.value.split(","),
                });
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-4">
            <Button
              className="btn btn-primary"
              onClick={() => {
                void mutate({
                  id,
                  name: projectData.title,
                  description: projectData.description,
                  githubUrl: projectData.githubLink,
                  ImageUrl: projectData.imageLink,
                  projectUrl: projectData.projectLink,
                  languages: projectData.languages,
                  projectInitiated: new Date(
                    projectData.projectStarted,
                  ).toString(),
                  projectCompleted: projectData.projectFinished
                    ? new Date(projectData.projectFinished).toString()
                    : undefined,
                  isCompleted: projectData.isCompleted,
                });
              }}
            >
              Save
            </Button>
            <Button className="btn btn-primary" onClick={handleProjectModal}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EditProjectModal;
