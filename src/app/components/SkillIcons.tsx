'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { Skills, skill } from '../utils/projectArr';

const SkillIcon = ({ colorScheme, src }: skill) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  return (
    <>
      <div ref={hoverRef}>
        <div
          className={`w-max h-max rounded-full p-2 m-2 drop-shadow-lg hover:drop-shadow-[0_0_10px_${colorScheme}]`}
          style={{
            filter: isHover ? `drop-shadow( 0 0 10px ${colorScheme})` : 'none',
          }}
        >
          <Image
            src={src}
            className='w-16 h-16'
            width={150}
            height={150}
            loading='lazy'
            alt={''}
          />
        </div>
      </div>
    </>
  );
};

const SkillIcons = () => {
  return (
    <div className='flex'>
      {Skills.map((skill, key) => {
        return (
          <div key={key}>
            <SkillIcon {...skill} />
          </div>
        );
      })}
    </div>
  );
};

export default SkillIcons;
