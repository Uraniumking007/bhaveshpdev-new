import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Collapse,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function BrandNewHeader() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link href="/" className="flex items-center text-base-content">
        <Button
          placeholder={""}
          className="m-0 bg-transparent p-0 capitalize text-base-content shadow-none hover:shadow-none md:p-1"
        >
          <Typography
            placeholder={""}
            as="li"
            variant="small"
            className="p-1 font-normal text-base-content"
          >
            Home
          </Typography>
        </Button>
      </Link>
      <Link href="/projects" className="flex items-center text-base-content">
        <Button
          placeholder={""}
          className="m-0 bg-transparent p-0 capitalize text-base-content shadow-none hover:shadow-none md:p-1"
        >
          <Typography
            placeholder={""}
            as="li"
            variant="small"
            className="p-1 font-normal text-base-content"
          >
            Projects
          </Typography>
        </Button>
      </Link>
      <Link href="/skills" className="flex items-center text-base-content">
        <Button
          placeholder={""}
          className="m-0 bg-transparent p-0 capitalize text-base-content shadow-none hover:shadow-none md:p-1"
        >
          <Typography
            placeholder={""}
            as="li"
            variant="small"
            className="p-1 font-normal text-base-content"
          >
            Skills
          </Typography>
        </Button>
      </Link>
      <Link href="/resume" className="flex items-center text-base-content">
        <Button
          placeholder={""}
          className="m-0 bg-transparent p-0 capitalize text-base-content shadow-none hover:shadow-none md:p-1"
        >
          <Typography
            placeholder={""}
            as="li"
            variant="small"
            className="p-1 font-normal text-base-content"
          >
            Resume
          </Typography>
        </Button>
      </Link>
    </ul>
  );

  return (
    <>
      <Navbar
        placeholder={""}
        className="sticky inset-0 z-10 h-max max-w-full rounded-none border-none bg-base-100 px-4  py-2 shadow-lg shadow-black/40 lg:px-8 lg:py-4"
      >
        <div className="flex items-center justify-between text-base-content">
          <Link href={"/"} className="btn btn-ghost">
            <Image
              src={"/BhaveshPatilText.png"}
              alt={""}
              width={250}
              height={30}
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              placeholder={""}
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </>
  );
}
