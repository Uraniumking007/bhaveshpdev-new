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

const AdminCards = (project: Projects) => {
  const ctx = api.useContext();

  const { mutate } = api.example.deleteProject.useMutation({
    onSuccess: () => {
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
    <Card className="w-full  flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-md p-2 "
      >
        <img
          src={project.image}
          alt="card-image"
          className="h-full w-full rounded-md object-fill"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {project.tech}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {project.name}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {project.description}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <Button size="lg" ripple className="text-sm">
          View Project
        </Button>
        <Button size="lg" ripple className="text-sm">
          Edit Project
        </Button>
        <Button
          size="lg"
          ripple
          className="text-sm"
          onClick={() => {
            deleteProject(project.id);
          }}
        >
          Delete Project
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminCards;
