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

  const { mutate } = api.example.createProject.useMutation({
    onSuccess: () => {
      void router.push("/adminjod");
    },
    onError: (err) => {
      console.log(err);
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
    setOpenProjectModal(false);
    setProjectData({
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
              defaultValue={projectData.title}
              onChange={(e) => {
                setProjectData({ ...projectData, title: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="text"
              variant="standard"
              label="Description"
              defaultValue={projectData.description}
              onChange={(e) => {
                setProjectData({ ...projectData, description: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="url"
              defaultValue={projectData.projectLink}
              variant="standard"
              label="Project Link"
              onChange={(e) => {
                setProjectData({ ...projectData, projectLink: e.target.value });
              }}
            />{" "}
            <Input
              crossOrigin=""
              type="url"
              variant="standard"
              label="GitHub Link"
              defaultValue={projectData.githubLink}
              onChange={(e) => {
                setProjectData({ ...projectData, githubLink: e.target.value });
              }}
            />
            <Input
              crossOrigin=""
              type="url"
              variant="standard"
              label="Image Link"
              defaultValue={projectData.imageLink}
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
              checked={projectData.isCompleted}
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
              defaultValue={projectData.projectFinished}
              onChange={(e) => {
                const d = new Date(e.target.value);

                setProjectData({
                  ...projectData,
                  projectFinished: d.toISOString(),
                });
              }}
            />
            <Input
              crossOrigin=""
              type="text"
              variant="standard"
              label="Languages"
              defaultValue={projectData.languages.join(",")}
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
