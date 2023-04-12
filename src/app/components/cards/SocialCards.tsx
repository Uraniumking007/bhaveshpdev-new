'use client';

import { CardHeader, IconButton } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export const SocialCard = () => {
  return (
    <div className='m-2 text-base-content flex flex-col md:flex-row md:m-4'>
      <div className='card md:w-80 w-64 md:text-lg text-sm bg-neutral shadow-xl h-max rounded-3xl'>
        <CardHeader className='relative shadow-md shadow-base-300 md:h-56'>
          <Image
            src='/assets/bhavesh4.jpg'
            alt=''
            width={720}
            height={720}
            className='h-full w-full'
          />
        </CardHeader>
        <div className='flex flex-col text-center justify-center p-4 md:p-8'>
          <h2 className='text-2xl text-neutral-content text-center font-semibold'>
            Bhavesh Patil
          </h2>
          <p className='text-neutral-content'>Frontend Web Developer</p>
          <div className='mt-2 flex justify-evenly'>
            <Link href='https://www.linkedin.com/in/bhavesh-patil-399bab248/'>
              <IconButton className='bg-base-300 rounded-full shadow-none hover:shadow-md hover:shadow-base-100 hover:bg-base-100 active:bg-base-focus text-neutral-content'>
                <i className='devicon-linkedin-plain text-xl' />
              </IconButton>
            </Link>
            <Link href='#https://github.com/Uraniumking007'>
              <IconButton className='bg-base-300 rounded-full shadow-none hover:shadow-md hover:shadow-base-100 hover:bg-base-100 active:bg-base-focus text-neutral-content'>
                <i className='devicon-github-original text-2xl' />
              </IconButton>
            </Link>
            <Link href='https://twitter.com/UraniumKing0'>
              <IconButton className='rounded-full bg-base-300 shadow-none hover:shadow-md hover:shadow-base-100 hover:bg-base-100 active:bg-base-focus text-neutral-content'>
                <i className='devicon-twitter-original colored text-xl' />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
