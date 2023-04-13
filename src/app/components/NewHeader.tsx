"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NewHeader = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setTimeout(() => {
      setOpen(!open);
    }, 160);
  };
  return (
    <div className="fixed bg-base w-full h-20 shadow-xl z-[100]">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <div
          className="md:hidden active:scale-75 ease-in-out duration-150"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <a className="hover:bg-base-content/10 p-2 rounded-lg active:scale-90 duration-150 ease-in-out normal-case text-xl ">
          <div className="relative lg:w-96 md:w-64 w-40  lg:h-12 md:h-8 h-8">
            <Image src={"/BhaveshPatilText.png"} fill alt={""} />
          </div>
        </a>
        <div>
          <div className="flex md:hidden pr-2 active:scale-75 ease-in-out duration-500">
            <Image
              src={"/icons/Social/github-white.svg"}
              width={35}
              height={35}
              alt={""}
            />
          </div>
          <ul className="hidden md:flex">
            <Link href={"/"}>
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            </Link>
            <Link href={"/about"}>
              <li className="ml-10 text-sm uppercase hover:border-b">About</li>
            </Link>
            <Link href={"/skills"}>
              <li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
            </Link>
            <Link href={"/projects"}>
              <li className="ml-10 text-sm uppercase hover:border-b">
                Projects
              </li>
            </Link>
            {/* <Link href={'/contact'}>
              <li className='ml-10 text-sm uppercase hover:border-b'>
                Contacts
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
      <div
        className={
          open ? "fixed left-0 top-0 w-full h-screen md:hidden bg-black/60" : ""
        }
      >
        <div
          className={
            open
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-base-100 p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 w-[75%] p-10 ease-in duration-500"
          }
        >
          <div className="">
            <div className="flex w-full items-center justify-between">
              <Image
                src={"/BhaveshPatilText.png"}
                width={170}
                height={50}
                alt={""}
              />
              <div
                className="rounded-full shadow-lg shadow-base-300 m-4 p-2 cursor-pointer active:scale-75 ease-in-out duration-150"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="py-4 flex flex-col">
              <ul className="uppercase">
                <Link href={"/"}>
                  <li className="py-4 text-sm ">Home</li>
                </Link>
                <Link href={"/about"}>
                  <li className="py-4 text-sm ">About</li>
                </Link>
                <Link href={"/skills"}>
                  <li className="py-4 text-sm ">Skills</li>
                </Link>
                <Link href={"/projects"}>
                  <li className="py-4 text-sm ">Projects</li>
                </Link>
                {/* <Link href={'/'}>
                  <li className='py-4 text-sm '>Contact</li>
                </Link> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeader;
