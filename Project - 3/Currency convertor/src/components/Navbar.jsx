import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div>
        <nav className={`w-full h-[12vh] border-b items-center justify-around ${props.visibility==='visible'? 'flex':'hidden'} ${props.mode === 'light' ? 'bg-cyan-400 text-black border-b-black':'bg-black text-white border-b-white'}`}>
            <div className="logo"><img className='max-md:ml-4 w-[50%] rounded-xl' src="/logo Codex.png" alt="" /></div>
            <ul className='flex gap-8'>
                <Link className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} to='/'>Home</Link>
                <a className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} href='#'>Contact</a>
                <Link className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} to='/about'>About</Link>
                <button onClick={props.tgMode} className={`border-b-[1.5px] border-x-2 rounded-md ${props.mode === 'light' ? 'border-black':'border-white'} px-3`}>{props.modeTxt}</button>
            </ul>
        </nav>
        <footer className={`${props.visibility==='visible'?'hidden':'flex'} ${props.mode === 'light' ? 'bg-cyan-400 text-black border-t-black':'bg-black text-white border-b-white'} w-full h-[12vh] border-t items-center justify-around`}>
        <p>All Copyrights reserved &copy;</p>
    </footer>
    </div>
  )
}

export default Navbar
