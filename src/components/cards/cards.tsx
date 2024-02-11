/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import type { Projects } from "@prisma/client";
import { FaGithub, FaGlobe } from "react-icons/fa";
import Link from "next/link";

const Cards = (project: Projects) => {
  const [readmore, setReadmore] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState(false);
  const desRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (desRef.current) {
      setShowReadMore(
        desRef.current.scrollHeight !== desRef.current.clientHeight,
      );
    }
  }, []);

  return (
    <Card className="h-96 w-96 bg-base-300 ">
      <CardHeader shadow={false} floated={false} className="h-56">
        <img
          src={project.image}
          alt="card-image"
          className="h-52 w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            color="blue-gray"
            className="font-medium text-base-content"
          >
            {project.name}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal text-base-content opacity-75"
          style={
            readmore
              ? { display: "block" }
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
        </Typography>
        {showReadMore && (
          <Typography
            className="cursor-pointer select-none font-medium text-secondary underline"
            onClick={() => {
              setReadmore(!readmore);
            }}
          >
            {readmore ? "Read Less" : "Read More"}
          </Typography>
        )}
      </CardBody>
      <CardFooter className="flex gap-2 pt-0">
        <Link href={project.link} className="w-full">
          <Button
            ripple={true}
            fullWidth={true}
            className="flex items-center justify-center gap-1 bg-primary text-primary-content shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            <FaGlobe size={16} />
            Preview
          </Button>
        </Link>
        <Link href={project.github} className="w-full">
          <Button
            ripple={true}
            fullWidth={true}
            className="flex items-center justify-center gap-1 bg-primary text-primary-content shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            <FaGithub size={16} />
            Github
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Cards;
