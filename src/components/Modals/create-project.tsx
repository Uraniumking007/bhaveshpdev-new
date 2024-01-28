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

interface ProjectData {
  name: string;
  description: string;
  githubLink: string;
  projectLink: string;
  imageLink: string;
  projectStarted: string;
  projectFinished?: string;
  languages: string[];
  isCompleted: boolean;
}

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

  const [projectData, setProjectData] = React.useState<ProjectData>({
    name: "",
    description: "",
    githubLink: "",
    imageLink: "",
    projectLink: "",
    projectStarted: Date.now().toString(),
    projectFinished: Date.now().toString(),
    languages: [],
    isCompleted: false,
  });

  const handleCreateProject = () => {
    const {
      name,
      description,
      githubLink,
      imageLink,
      isCompleted,
      languages,
      projectLink,
      projectStarted,
      projectFinished,
    } = projectData;
    mutate({
      name,
      description,
      githubUrl: githubLink,
      ImageUrl: imageLink,
      projectUrl: projectLink,
      projectInitiated: projectStarted,
      projectCompleted: projectFinished,
      languages,
      isCompleted,
    });
    setOpenProjectModal(false);
    setProjectData({
      name: "",
      description: "",
      githubLink: "",
      imageLink: "",
      projectLink: "",
      projectStarted: Date.now().toString(),
      projectFinished: Date.now().toString(),
      languages: [],
      isCompleted: false,
    });
  };

  return (
    <div>
      <Dialog handler={handleProjectModal} open={openProjectModal}>
        <DialogHeader>Create Project</DialogHeader>
        <DialogBody>
          <div className="flex  flex-col gap-5">
            <ProjectInput
              label="Title"
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
            <Input
              crossOrigin=""
              type="date"
              variant="standard"
              label="Project Started"
              defaultValue={projectData.projectStarted}
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
              // defaultValue={projectData.isCompleted}
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
