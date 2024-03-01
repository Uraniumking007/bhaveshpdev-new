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
import type { Projects } from "@prisma/client";

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
  const ctx = api.useContext();
  const { mutate } = api.example.updateProject.useMutation({
    onSuccess: () => {
      void ctx.example.getProjects.invalidate();
    },
  });

  const [projectData, setProjectData] = React.useState<Projects>({
    id: "",
    name: "",
    description: "",
    github: "",
    image: "",
    link: "",
    projectInitiated: new Date(),
    projectCompleted: new Date(),
    tech: [],
    isCompleted: false,
    createdAt: new Date(), // Add createdAt property
    updatedAt: new Date(), // Add updatedAt property
  });

  const { data, error, isFetched } = api.example.getOneProject.useQuery({
    id,
  });
  useEffect(() => {
    if (data) {
      const {
        id,
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
        id,
        name,
        description,
        github,
        image,
        link,
        projectInitiated: new Date(projectInitiated),
        projectCompleted: projectCompleted ? new Date(projectCompleted) : null,
        tech,
        isCompleted,
        createdAt: new Date(), // Add createdAt property
        updatedAt: new Date(), // Add updatedAt property
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
      <Dialog
        placeholder={""}
        handler={handleProjectModal}
        open={openProjectModal}
      >
        <DialogHeader placeholder={""}>Create Project</DialogHeader>
        <DialogBody placeholder={""}>
          <div className="flex  flex-col gap-5">
            <ProjectInput
              label="Name"
              type="text"
              value={projectData.name}
              onChange={(e) => {
                setProjectData({ ...projectData, name: e.target.value });
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
              value={projectData.link}
              label="Project Link"
              onChange={(e) => {
                setProjectData({ ...projectData, link: e.target.value });
              }}
            />{" "}
            <ProjectInput
              type="url"
              label="GitHub Link"
              value={projectData.github}
              onChange={(e) => {
                setProjectData({ ...projectData, github: e.target.value });
              }}
            />
            <ProjectInput
              type="url"
              label="Image Link"
              value={projectData.image}
              onChange={(e) => {
                setProjectData({ ...projectData, image: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="date"
              label="Project Started"
              disabled={!projectData.projectInitiated}
              value={`${projectData.projectInitiated.getFullYear()}-${String(
                projectData.projectInitiated.getMonth() + 1,
              ).padStart(2, "0")}-${String(
                projectData.projectInitiated.getDate(),
              ).padStart(2, "0")}`}
              onChange={(e) => {
                const d = new Date(e.target.value);
                setProjectData({
                  ...projectData,
                  projectInitiated: d,
                });
              }}
            />
            <Checkbox
              crossOrigin={""}
              label="Completed"
              checked={projectData.isCompleted}
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
              value={
                projectData.projectCompleted
                  ? `${projectData.projectCompleted.getFullYear()}-${String(
                      projectData.projectCompleted.getMonth() + 1,
                    ).padStart(2, "0")}-${String(
                      projectData.projectCompleted.getDate(),
                    ).padStart(2, "0")}`
                  : ""
              }
              onChange={(e) => {
                const d = e.target.valueAsDate!;
                setProjectData({
                  ...projectData,
                  projectCompleted: d,
                });
              }}
            />
            <ProjectInput
              type="text"
              label="Languages"
              value={projectData.tech.join(",")}
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  tech: e.target.value.split(","),
                });
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <div className="flex gap-4">
            <Button
              placeholder={""}
              className="btn btn-primary"
              onClick={() => {
                void mutate({
                  id,
                  name: projectData.name,
                  description: projectData.description,
                  github: projectData.github,
                  image: projectData.image,
                  link: projectData.link,
                  projectInitiated: projectData.projectInitiated,
                  projectCompleted: projectData.projectCompleted,
                  tech: projectData.tech,
                  isCompleted: projectData.isCompleted,
                });
                setOpenProjectModal(false);
              }}
            >
              Save
            </Button>
            <Button
              placeholder={""}
              className="btn btn-primary"
              onClick={handleProjectModal}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EditProjectModal;
