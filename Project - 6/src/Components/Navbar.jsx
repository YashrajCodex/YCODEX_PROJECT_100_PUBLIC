import React from 'react';

function Navbar({ title }) {
  return (
    <nav className={`h-[15vh] text-white flex items-center justify-between px-7 bg-black ${title === 'FooterBio' ? 'footer' : 'navbar'}`}>
      <h1 className='tracking-widest'>{title}</h1>
      <ul className='flex gap-6'>
        <li>
          <a className='font-medium text-blue-600 dark:text-blue-500 hover:underline' href="/">Home</a>
        </li>
        <li>
          <a className='font-medium text-blue-600 dark:text-blue-500 hover:underline' href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
