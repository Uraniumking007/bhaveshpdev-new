"use client";
import MagicBorderButton from "@/components/Buttons/magic-border-button";
import { prisma } from "@/lib/prisma";
import { parseDate } from "@internationalized/date";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input, DatePicker, Checkbox, Button } from "@nextui-org/react";
import { Projects } from "@prisma/client";
import React, { useState } from "react";
import { createProject, revalidateAdminPages } from "../adminActions";

function CreateProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newProject, setnewProject] = useState<Partial<Projects>>({
    name: "",
    description: "",
    link: "",
    github: "",
    images: [],
    tech: [],
    projectInitiated: new Date(),
    projectCompleted: new Date(),
    isCompleted: false,
    categories: [],
  });
  const [error, setError] = useState("");

  const endDate = new Date(newProject.projectCompleted ?? "");
  const startDate = new Date(newProject.projectInitiated ?? "");

  async function handleSave() {
    try {
      if (newProject.name === undefined || newProject.name === "") {
        throw new Error("Name is required");
      }
      if (
        newProject.description === undefined ||
        newProject.description === ""
      ) {
        throw new Error("Description is required");
      }
      if (newProject.link === undefined || newProject.link === "") {
        throw new Error("Link is required");
      }
      if (newProject.github === undefined || newProject.github === "") {
        throw new Error("Github is required");
      }
      if (newProject.images === undefined || newProject.images.length === 0) {
        throw new Error("At least one image is required");
      }
      if (newProject.projectInitiated === undefined) {
        throw new Error("Project Initiated is required");
      }
      await createProject({ project: newProject as Projects });
      await revalidateAdminPages();
      onOpenChange();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <>
      <MagicBorderButton onClick={onOpen}>Create Project</MagicBorderButton>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Project
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    size={"md"}
                    type="text"
                    label="Title"
                    placeholder="Enter Title"
                    onChange={(e) =>
                      setnewProject({
                        ...newProject,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    size={"md"}
                    type="text"
                    label="Description"
                    placeholder="Enter Description"
                    onChange={(e) =>
                      setnewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    size={"md"}
                    type="text"
                    label="Preview Link"
                    placeholder="Enter Preview Link"
                    onChange={(e) =>
                      setnewProject({
                        ...newProject,
                        link: e.target.value,
                      })
                    }
                  />
                  <Input
                    size={"md"}
                    type="text"
                    label="Github Link"
                    placeholder="Enter Github Link"
                    onChange={(e) =>
                      setnewProject({
                        ...newProject,
                        github: e.target.value,
                      })
                    }
                  />
                  <div className="space-y-2">
                    <Input
                      size={"md"}
                      type="text"
                      label="Images"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      onChange={(e) => {
                        const imageUrls = e.target.value
                          .split(",")
                          .map((url) => url.trim())
                          .filter((url) => url.length > 0);
                        setnewProject({
                          ...newProject,
                          images: imageUrls,
                        });
                      }}
                    />
                    <p className="text-xs text-gray-400">
                      Enter multiple image URLs separated by commas. The first image will be used as the main preview.
                    </p>
                  </div>
                  <Input
                    size={"md"}
                    type="text"
                    label="Tech Stack"
                    placeholder="tech1, tech2, tech3,"
                    onChange={(e) => {
                      setnewProject({
                        ...newProject,
                        tech: e.target.value.split(","),
                      });
                    }}
                  />
                  <Input
                    size={"md"}
                    type="text"
                    label="Categories"
                    placeholder="category1, category2, category3"
                    onChange={(e) => {
                      setnewProject({
                        ...newProject,
                        categories: e.target.value.split(","),
                      });
                    }}
                  />
                  <DatePicker
                    defaultValue={
                      parseDate(startDate.toISOString().slice(0, 10)) as any
                    }
                    label="Project Start Date"
                    className="max-w-[284px]"
                    onChange={(e) => {
                      if (e) {
                        setnewProject({
                          ...newProject,
                          projectInitiated: new Date(
                            e.toDate("UTC").toISOString().slice(0, 10)
                          ),
                        });
                      }
                    }}
                  />
                  <Checkbox
                    onChange={(e) =>
                      setnewProject({
                        ...newProject,
                        isCompleted: e.target.checked,
                      })
                    }
                    size="sm"
                  >
                    Completed
                  </Checkbox>
                  {newProject.isCompleted ? (
                    <DatePicker
                      defaultValue={
                        parseDate(endDate.toISOString().slice(0, 10)) as any
                      }
                      label="Project End Date"
                      className="max-w-[284px]"
                      onChange={(e) => {
                        if (e) {
                          setnewProject({
                            ...newProject,
                            projectCompleted: new Date(
                              e.toDate("UTC").toISOString().slice(0, 10)
                            ),
                          });
                        }
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-red-500">{error}</div>
              </ModalBody>
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
    </>
  );
}

export default CreateProjectModal;
