import { CardHeader, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export const SocialCard = () => {
  return (
    <div className="m-2 flex flex-col text-base-content md:m-4 md:flex-row">
      <div className="card h-max w-64 rounded-3xl bg-neutral text-sm shadow-xl md:w-80 md:text-lg">
        <CardHeader className="relative shadow-md shadow-base-300 md:h-56">
          <Image
            src="/assets/bhavesh4.jpg"
            alt=""
            width={720}
            height={720}
            className="h-full w-full"
          />
        </CardHeader>
        <div className="flex flex-col justify-center p-4 text-center md:p-8">
          <h2 className="text-center text-2xl font-semibold text-neutral-content">
            Bhavesh Patil
          </h2>
          <p className="text-neutral-content">Frontend Web Developer</p>
          <div className="mt-2 flex justify-evenly">
            <Link href="https://www.linkedin.com/in/bhavesh-patil-399bab248/">
              <IconButton className="active:bg-base-focus rounded-full bg-base-300 text-neutral-content shadow-none hover:bg-base-100 hover:shadow-md hover:shadow-base-100">
                <i className="devicon-linkedin-plain text-xl" />
              </IconButton>
            </Link>
            <Link href="#https://github.com/Uraniumking007">
              <IconButton className="active:bg-base-focus rounded-full bg-base-300 text-neutral-content shadow-none hover:bg-base-100 hover:shadow-md hover:shadow-base-100">
                <i className="devicon-github-original text-2xl" />
              </IconButton>
            </Link>
            <Link href="https://twitter.com/UraniumKing0">
              <IconButton className="active:bg-base-focus rounded-full bg-base-300 text-neutral-content shadow-none hover:bg-base-100 hover:shadow-md hover:shadow-base-100">
                <i className="devicon-twitter-original colored text-xl" />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
