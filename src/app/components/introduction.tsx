import Image from 'next/image';
import Link from 'next/link';

const Introduction = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center flex-col sm:flex-row md:w-[75%] lg:w-[60%]'>
        <div className='avatar m-2 justify-center'>
          <div className='w-16 md:w-40 lg:w-72 mask mask-squircle'>
            <Image
              src='/BhaveshPatil.jpg'
              width={1280}
              height={720}
              alt=''
              loading='eager'
            />
          </div>
        </div>
        <div className='text-sm tracking-normal lg:text-xl text-center items-center'>
          <span className='text-xl lg:text-3xl'>
            Hi! I&apos;m <span className=' text-yellow-400'>Bhavesh</span>
          </span>
          <div className='p-2 '>
            I&apos;m a computer engineering student who enjoys using JavaScript,
            TypeScript, Next.js, and Tailwind CSS. I am interested about
            creating dynamic, responsive web applications that provide an
            excellent user experience.
          </div>
          <div className='flex justify-center items-center'>
            <div className='text-lg'>Contact Me : </div>
            <div className='m-1 ml-2 active:scale-75 ease-in-out duration-500 sm:m-2'>
              <Link href={'mailto:bhaveshpatil8000@gmail.com'} target='_blank'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                  />
                </svg>
              </Link>
            </div>
            <div className='m-1 active:scale-75 ease-in-out duration-500 sm:m-2'>
              <Link href={'https://discord.gg/kcQWJCa5BV'} target='_blank'>
                <Image
                  src={'/assets/social-icons/discord.svg'}
                  width={28}
                  height={28}
                  alt='Discord'
                />
              </Link>
            </div>
            <div className='m-1 active:scale-75 ease-in-out duration-500 sm:m-2'>
              <Link href={'https://twitter.com/UraniumKing0'} target='_blank'>
                <Image
                  src={'/assets/social-icons/twitter.svg'}
                  width={28}
                  height={28}
                  alt='Discord'
                />
              </Link>
            </div>
            <div className='m-1 active:scale-75 ease-in-out duration-500 sm:m-2'>
              <Link href={'https://github.com/Uraniumking007'} target='_blank'>
                <Image
                  src={'/assets/social-icons/github.svg'}
                  width={25}
                  height={25}
                  alt={''}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
