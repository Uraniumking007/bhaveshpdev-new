import Image from "next/image";
import React from "react";
import { type ProjectsDetails } from "@/utils/data";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

const Cards = (project: ProjectsDetails) => {
  return (
    <div className="m-2 md:m-4">
      <div
        data-theme="business"
        className="card h-96 w-64 rounded-3xl bg-base-100 text-sm shadow-xl duration-150 ease-in-out hover:scale-105 hover:drop-shadow-4xl md:w-96 md:text-lg"
      >
        <figure className="relative h-fit w-full ">
          <Image
            src={project.imgLink}
            alt={project.title}
            width={1280}
            height={720}
            // fill
            className="h-full w-full"
          />
        </figure>
        <div className="card-body p-4 md:p-8">
          <h2 className="card-title font-semibold ">{project.title}</h2>
          <p>{project.description}</p>
          <p className="text-red-500 md:text-sm">{project?.warning}</p>
          <div className=" mt-2 flex justify-evenly">
            <Link href={project.previewLink}>
              <div className="card-actions justify-end">
                <Button className="btn rounded-2xl bg-neutral text-neutral-content shadow-none hover:bg-neutral-focus hover:shadow-md hover:shadow-base-300 active:bg-neutral-focus">
                  Preview
                </Button>
              </div>
            </Link>
            <Link href={project.githubLink}>
              <div className="card-actions justify-end">
                <Button className="btn rounded-2xl bg-neutral text-neutral-content shadow-none hover:bg-neutral-focus hover:shadow-md hover:shadow-base-300 active:bg-neutral-focus">
                  GitHub
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
