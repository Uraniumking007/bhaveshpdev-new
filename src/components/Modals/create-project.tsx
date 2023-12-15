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

const CreateProjectModal = ({
  openProjectModal,
  setOpenProjectModal,
}: {
  openProjectModal: boolean;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleProjectModal = () => setOpenProjectModal(!openProjectModal);
  const ctx = api.useContext();

  const { mutate, data, error } = api.example.createProject.useMutation({
    onSuccess: () => {
      void router.push("/admin");
    },
  });

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

  const handleCreateProject = () => {
    console.log(projectData);
    mutate({
      name: projectData.title,
      description: projectData.description,
      githubUrl: projectData.githubLink,
      ImageUrl: projectData.imageLink,
      projectUrl: projectData.projectLink,
      projectInitiated: projectData.projectStarted,
      projectCompleted: projectData.projectFinished,
      languages: projectData.languages,
      isCompleted: true,
    });
  };

  return (
    <div>
      <Dialog handler={handleProjectModal} open={openProjectModal}>
        <DialogHeader>Create Project</DialogHeader>
        <DialogBody>
          <div className="flex  flex-col gap-5">
            <Input
              crossOrigin=""
              variant="standard"
              label="Title"
              type="text"
              onChange={(e) => {
                setProjectData({ ...projectData, title: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="text"
              variant="standard"
              label="Description"
              onChange={(e) => {
                setProjectData({ ...projectData, description: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="url"
              variant="standard"
              label="Project Link"
              onChange={(e) => {
                setProjectData({ ...projectData, githubLink: e.target.value });
              }}
            />{" "}
            <Input
              crossOrigin=""
              type="url"
              variant="standard"
              label="GitHub Link"
              onChange={(e) => {
                setProjectData({ ...projectData, githubLink: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="url"
              variant="standard"
              label="Image Link"
              onChange={(e) => {
                setProjectData({ ...projectData, imageLink: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="date"
              variant="standard"
              label="Project Started"
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  projectStarted: e.target.value,
                });
              }}
            />
            <Checkbox
              crossOrigin={""}
              label="Completed"
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  projectFinished: e.target.value,
                });
              }}
            />
            <Input
              crossOrigin=""
              type="date"
              variant="standard"
              label="Project Finished"
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  projectFinished: e.target.value,
                });
              }}
            />
            <Input
              crossOrigin=""
              type="text"
              variant="standard"
              label="Languages"
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
