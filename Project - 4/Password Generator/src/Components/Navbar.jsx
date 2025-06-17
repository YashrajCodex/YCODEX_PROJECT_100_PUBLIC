import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div>
        <nav className={`w-full flex-wrap gap-2 min-h-[12vh] box-border border-b items-center justify-evenly ${props.visibility==='visible'? 'flex':'hidden'} ${props.mode === 'light' ? 'bg-white text-black border-b-black':'bg-black text-white border-b-white'}`}>
            <div className="logo"><img className='w-1/2 rounded-xl' src="/YCodexFavicon.png" alt="logo" /></div>
            <ul className='flex gap-8 max-md:gap-2'>
                <Link className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} to='/'>Home</Link>
                <a className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} href='#'>Contact</a>
                <Link className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} to='/about'>About</Link>
                <button onClick={props.tgMode} className='er-b-[1.5px] border-x-2 rounded-md border-black px-3'>{props.modeTxt}</button>
            </ul>
        </nav>
      <footer className={`${props.visibility==='visible'?'hidden':'flex'} ${props.mode === 'light' ? 'bg-white text-black border-t-black':'bg-black text-white border-b-white'} w-full h-[12vh] border-t items-center justify-around`}>
        <p>All Copyrights reserved &copy;</p>
      </footer>
    </div>
  )
}

export default Navbar
