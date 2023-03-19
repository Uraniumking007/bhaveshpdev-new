const Introduction = () => {
  return (
    <div className='flex justify-center flex-col sm:flex-row'>
      <div className='avatar m-2'>
        <div className='w-16 lg:w-24 mask mask-squircle'>
          <img src='/BhaveshPatil.jpg' />
        </div>
      </div>
      <div className='text-sm tracking-normal text-center items-center'>
        Hi! I'm Bhavesh, and I'm a computer engineering student who enjoys using
        JavaScript, TypeScript, Next.js, and Tailwind CSS. I am interested about
        creating dynamic, responsive web applications that provide an excellent
        user experience.
      </div>
    </div>
  );
};

export default Introduction;
