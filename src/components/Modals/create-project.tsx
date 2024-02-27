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
import router from "next/router";
import React from "react";
import ProjectInput from "./projectInput";
import type { Projects } from "@prisma/client";

const CreateProjectModal = ({
  openProjectModal,
  setOpenProjectModal,
}: {
  openProjectModal: boolean;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleProjectModal = () => setOpenProjectModal(!openProjectModal);
  const ctx = api.useContext();

  const { mutate } = api.example.createProject.useMutation({
    onSuccess: () => {
      void ctx.example.getProjects.invalidate();
      void router.push("/adminjod");
    },
    onError: (err) => {
      console.log(err);
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

  const handleCreateProject = () => {
    const {
      name,
      description,
      github,
      image,
      isCompleted,
      tech,
      link,
      projectInitiated,
      projectCompleted,
    } = projectData;
    mutate({
      name,
      description,
      github,
      image,
      link,
      projectInitiated,
      projectCompleted,
      tech,
      isCompleted,
    });
    setOpenProjectModal(false);
    setProjectData({
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
  };

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
              variant="standard"
              label="Project Started"
              // defaultValue={projectData.projectStarted}
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
              // defaultValue={projectData.isCompleted}
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
              variant="standard"
              label="Project Finished"
              disabled={!projectData.isCompleted}
              // defaultValue={projectData.projectFinished}
              onChange={(e) => {
                const d = new Date(e.target.value);
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
              className="btn btn-primary"
              onClick={() => {
                void handleCreateProject();
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

export default CreateProjectModal;
