import React from 'react';
import { SocialCard } from '../components/Cards';

const about = () => {
  return (
    <div className='h-[calc(100%-5rem)] w-full lg:justify-center lg:items-center flex overflow-auto flex-col'>
      <div className='w-full  lg:w-[95%] xl:w-[55%] '>
        <div className='text-2xl lg:text-6xl md:text-4xl  mt-4  '>
          <h1 className='text-center'>About</h1>
        </div>
        <div className='flex w-full mt-4 items-center md:justify-center flex-col md:flex-row'>
          <SocialCard />
          <div className='flex flex-col p-4 mt-2 md:p-8'>
            <div className='text-sm text-center md:text-base lg:text-lg'>
              I am a computer engineering student at CGPIT, Uka Tarsadia
              University. I&apos;m just getting started with coding and
              attempting to learn various programming languages.
            </div>
            <div className='text-[0.975rem] md:text-[1.075rem] lg:text-xl text-center mt-2'>
              Web Developer | Student | Content Creator
            </div>
            <div className='text-xs md:text-sm lg:text-base mt-2'>
              * 🌍 I&apos;m based in Gujarat, India
              <br /> * 🧠 I&apos;m learning Javascript
              <br /> * 🤔 I&apos;m looking for help with learning more about
              javascript.
              <br /> * 😄 Pronouns: he/his
              <br /> * ⚡ I like playing games.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
