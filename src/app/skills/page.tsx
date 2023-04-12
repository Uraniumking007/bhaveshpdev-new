import SkillIcons from '../components/SkillIcons';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhavesh Patil - Home',
  description:
    "This is a home page it contains information regarding bhavesh's skills",
};

const page = () => {
  return (
    <div className='flex justify-center items-center select-none h-[calc(100%-4rem)] w-full'>
      <SkillIcons />
    </div>
  );
};

export default page;
