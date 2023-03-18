import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <div>
      <div className='navbar bg-base-100 shadow-lg'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 rounded-box w-52'
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Projects</a>
              </li>
              <li>
                <a>Blogs</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-center'>
          <a className='btn btn-ghost normal-case text-xl'>
            <Image src={'/BhaveshpD.png'} width={280} height={280} alt={''} />
          </a>
        </div>
        <div className='navbar-end'>
          <button className='btn btn-ghost btn-circle'>
            <Image
              src={'/icons/Social/github.svg'}
              width={25}
              height={25}
              alt={''}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;