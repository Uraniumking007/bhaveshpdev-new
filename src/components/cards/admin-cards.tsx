/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { type Projects } from "@prisma/client";
import { api } from "@/utils/api";
import EditProjectModal from "../Modals/edit-project";

const AdminCards = ({ project }: { project: Projects }) => {
  const ctx = api.useContext();
  const [openProjectModal, setOpenProjectModal] =
    React.useState<boolean>(false);

  const { mutate } = api.example.deleteProject.useMutation({
    onSuccess: () => {
      setOpenProjectModal(false);
      void ctx.example.getProjects.invalidate();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function deleteProject(id: Projects["id"]) {
    mutate({ id });
  }

  return (
    <Card className="w-full flex-row items-center justify-evenly">
      <div className=" flex">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 max-w-sm shrink-0 rounded-md p-2 "
        >
          <img
            src={project.image}
            alt="card-image"
            className="h-full rounded-md object-fill"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {project.tech.join(" + ")}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {project.name}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {project.description}
          </Typography>
        </CardBody>
      </div>
      <CardFooter className="ml-16 flex flex-col gap-2">
        <Button
          size="lg"
          className="text-sm"
          onClick={() => {
            window.open(project.link, "_blank");
          }}
        >
          View Project
        </Button>
        <Button
          size="lg"
          className="text-sm"
          onClick={() => {
            setOpenProjectModal(!openProjectModal);
          }}
        >
          Edit Project
        </Button>
        <Button
          size="lg"
          className="text-sm"
          onClick={() => {
            deleteProject(project.id);
          }}
        >
          Delete Project
        </Button>
      </CardFooter>
      <EditProjectModal
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
        id={project.id}
      />
    </Card>
  );
};

export default AdminCards;
