"use client";
import Image from "next/image";
import { Meteors } from "../../../../components/meteors";
import { Projects } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { IconEditCircle } from "@tabler/icons-react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button, Checkbox, DatePicker, Input } from "@nextui-org/react";
import { editProject, revalidateAdminPages } from "../adminActions";

export default function ProjectCardEditable(project: Projects) {
  const [readmore, setReadmore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const desRef = useRef<HTMLParagraphElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [editedProject, setEditedProject] = useState<Projects>(project);

  const [error, setError] = useState("");

  async function handleSave() {
    try {
      if (editedProject.name === undefined || editedProject.name === "") {
        throw new Error("Name is required");
      }
      if (
        editedProject.description === undefined ||
        editedProject.description === ""
      ) {
        throw new Error("Description is required");
      }
      if (editedProject.link === undefined || editedProject.link === "") {
        throw new Error("Link is required");
      }
      if (editedProject.github === undefined || editedProject.github === "") {
        throw new Error("Github is required");
      }
      if (editedProject.image === undefined || editedProject.image === "") {
        throw new Error("Image is required");
      }
      if (editedProject.projectInitiated === undefined) {
        throw new Error("Project Initiated is required");
      }
      await editProject({ project: editedProject as Projects });
      await revalidateAdminPages();
      onOpenChange();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const endDate = new Date(project.projectCompleted ?? "");
  const startDate = new Date(project.projectInitiated);

  useEffect(() => {
    if (desRef.current) {
      setShowReadMore(
        desRef.current.scrollHeight !== desRef.current.clientHeight
      );
    }
  }, []);

  return (
    <div className="w-full h-80 relative max-w-xs">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.70] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 h-full overflow-hidden rounded-2xl flex flex-col justify-evenly items-start">
        <div className="h-40 mt-4 w-full rounded-full flex items-center justify-center mb-4 ">
          <Image
            src={project.image}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            alt={project.name}
          />
        </div>

        <h1 className="font-bold text-balance text-white mb-1 relative z-20">
          {project.name}
        </h1>

        <p
          className="font-normal text-balance text-slate-500 mb-1 relative z-20"
          style={
            readmore
              ? { display: "block", overflow: "visible" }
              : {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  // textOverflow: "ellipsis",
                }
          }
          ref={desRef}
        >
          {project.description}
        </p>
        {showReadMore && (
          <span
            className="cursor-pointer select-none font-normal text-xs text-secondary underline mb-2"
            onClick={() => {
              setReadmore(!readmore);
            }}
          >
            {readmore ? "Read Less" : "Read More"}
          </span>
        )}
        <div className="w-full flex justify-end mb-4 px-4">
          <button
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
            onClick={onOpen}
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <IconEditCircle size={15} />
              <span>{`Edit`}</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </div>
        <Meteors number={1} />
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit {project.name} Project
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      size={"md"}
                      type="text"
                      label="Title"
                      placeholder="Enter Title"
                      defaultValue={project.name}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      size={"md"}
                      type="text"
                      label="Description"
                      placeholder="Enter Description"
                      defaultValue={project.description}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          description: e.target.value,
                        })
                      }
                    />
                    <Input
                      size={"md"}
                      type="text"
                      label="Preview Link"
                      placeholder="Enter Preview Link"
                      defaultValue={project.link}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          link: e.target.value,
                        })
                      }
                    />
                    <Input
                      size={"md"}
                      type="text"
                      label="Github Link"
                      placeholder="Enter Github Link"
                      defaultValue={project.github}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          github: e.target.value,
                        })
                      }
                    />
                    <Input
                      size={"md"}
                      type="text"
                      label="Image"
                      placeholder="Enter Image Link"
                      defaultValue={project.image}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          image: e.target.value,
                        })
                      }
                    />
                    <Input
                      size={"md"}
                      type="text"
                      label="Tech Stack"
                      placeholder="[tech1, tech2, tech3]"
                      defaultValue={project.tech.join(",")}
                      onChange={(e) => {
                        setEditedProject({
                          ...editedProject,
                          tech: e.target.value.split(","),
                        });
                      }}
                    />
                    <Input
                      size={"md"}
                      type="text"
                      label="Categories"
                      placeholder="[category1, category2, category3]"
                      defaultValue={project.categories.join(",")}
                      onChange={(e) => {
                        setEditedProject({
                          ...editedProject,
                          categories: e.target.value.split(","),
                        });
                      }}
                    />
                    <DatePicker
                      defaultValue={parseDate(
                        startDate.toISOString().slice(0, 10)
                      )}
                      label="Project Start Date"
                      className="max-w-[284px]"
                      onChange={(e) => {
                        setEditedProject({
                          ...editedProject,
                          projectInitiated: new Date(
                            e.toDate("UTC").toISOString().slice(0, 10)
                          ),
                        });
                      }}
                    />
                    <Checkbox
                      defaultSelected={project.isCompleted}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          isCompleted: e.target.checked,
                        })
                      }
                      size="sm"
                    >
                      Completed
                    </Checkbox>
                    {(project.isCompleted && project.projectCompleted) ||
                    editedProject.isCompleted ? (
                      <DatePicker
                        defaultValue={parseDate(
                          endDate.toISOString().slice(0, 10)
                        )}
                        label="Project End Date"
                        className="max-w-[284px]"
                        onChange={(e) => {
                          setEditedProject({
                            ...editedProject,
                            projectCompleted: new Date(
                              e.toDate("UTC").toISOString().slice(0, 10)
                            ),
                          });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </ModalBody>
                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleSave}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
