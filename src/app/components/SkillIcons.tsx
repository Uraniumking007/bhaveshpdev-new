import Image from 'next/image';

interface skill {
  src: string;
  colorScheme: string;
}
const Skills = [
  {
    src: '/icons/FrontendDevelopment/tailwind.svg',
    colorScheme: 'rgba(56,189,248,0.5)',
  },
  {
    src: '/icons/FrontendDevelopment/html.svg',
    colorScheme: 'rgba(251,110,34,0.5)',
  },
  {
    src: '/icons/FrontendDevelopment/css.svg',
    colorScheme: 'rgba(38,154,227,0.5)',
  },
];

const SkillIcon = ({ colorScheme, src }: skill) => {
  return (
    <>
      <div
        className={`w-max h-max rounded-full p-2 m-2 drop-shadow-lg hover:drop-shadow-[0_0_10px_${colorScheme}]`}
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
