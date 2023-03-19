import Image from 'next/image';
import Link from 'next/link';

const Introduction = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center flex-col sm:flex-row md:w-[75%] lg:w-[60%]'>
        <div className='avatar m-2 justify-center'>
          <div className='w-16 md:w-24 lg:w-72 mask mask-squircle'>
            <img src='/BhaveshPatil.jpg' />
          </div>
        </div>
        <div className='text-sm tracking-normal lg:text-xl text-center items-center'>
          Hi! I&apos;m Bhavesh, and I&apos;m a computer engineering student who
          enjoys using JavaScript, TypeScript, Next.js, and Tailwind CSS. I am
          interested about creating dynamic, responsive web applications that
          provide an excellent user experience.
          <div className='flex justify-center items-center'>
            <div className='text-lg'>Contact Me : </div>
            <div className='m-1 active:scale-75 ease-in-out duration-500 sm:m-2'>
              <Link href={'mailto:bhaveshpatil8000@gmail.com'} target='_blank'>
                <Image
                  src={'/assets/social-icons/gmail.svg'}
                  width={28}
                  height={28}
                  alt='Discord'
                />
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
                  src={'/icons/Social/github.svg'}
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
