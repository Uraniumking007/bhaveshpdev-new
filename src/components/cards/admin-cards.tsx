/* eslint-disable @next/next/no-img-element */
import React from "react";
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
    <div className="card card-side mx-2 bg-base-100 shadow-xl">
      <figure className="w-1/4">
        <img src={project.image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.name}</h2>
        <p>{project.description}</p>
      </div>
      <div className="mx-6 flex flex-col justify-evenly gap-2 py-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setOpenProjectModal(!openProjectModal);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            deleteProject(project.id);
          }}
        >
          Delete
        </button>
      </div>
      <EditProjectModal
        id={project.id}
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
      />
    </div>
  );
};

export default AdminCards;
