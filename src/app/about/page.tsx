import React from 'react';
import { SocialCard } from '../components/Cards';

const About = () => {
  return (
    <div className='h-[calc(100%-5rem)] w-full overflow-auto flex flex-col items-center'>
      <h1 className='text-center text-2xl lg:text-6xl md:text-4xl mb-12 mt-4'>
        About
      </h1>
      <div className='flex-grow flex items-center justify-center'>
        <div className='block w-full h-full lg:w-[95%] xl:w-[55%] mb-20 md:mb-0'>
          <div className='flex w-full mt-4 items-center md:justify-center flex-col md:flex-row'>
            <SocialCard />
            <div className='flex flex-col p-4 mt-2 md:p-8'>
              <p className='text-sm text-center md:text-base lg:text-lg'>
                I am a computer engineering student at CGPIT, Uka Tarsadia
                University. I&apos;m just getting started with coding and
                attempting to learn various programming languages.
              </p>
              <p className='text-[0.975rem] md:text-[1.075rem] lg:text-xl text-center mt-2'>
                Web Developer | Student | Content Creator
              </p>
              <ul className='text-xs md:text-sm lg:text-base mt-2 list-disc list-inside'>
                <li>🌍 I&apos;m based in Gujarat, India</li>
                <li>🧠 I&apos;m learning Javascript</li>
                <li>
                  🤔 I&apos;m looking for help with learning more about
                  javascript.
                </li>
                <li>😄 Pronouns: he/his</li>
                <li>⚡ I like playing games.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
