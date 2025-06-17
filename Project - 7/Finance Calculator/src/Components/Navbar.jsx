import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div>
        <nav className={`w-full min-h-[12vh] py-3 border-b items-center justify-center ${props.visibility==='visible'? 'flex':'hidden'} ${props.mode === 'light' ? 'NavL text-black border-b-black':'NavD text-white border-b-white'} max-md:text-[12px]`}>
            <div className="logo w-1/2 flex justify-center"><img className='h-[10vh] rounded-xl' src="/YCodexFavicon.png" alt="" /></div>
            <ul className='flex gap-8 pr-5 pb-2 scrollHidden'>
                <Link className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} to='/'>Home</Link>
                <a className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`} href='https://codexy-yashraj-001.netlify.app'>Contact</a>
                <button onClick={props.tgMode} className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`}>{props.modeTxt}</button>
                <Link to={'/compound'} className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`}>Compound Interest</Link>
                <Link to={'/annuity'} className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`}>Annuity</Link>
                <Link to={'/sip'} className={`border-b-[1.5px] border-x-2 rounded-md px-3 ${props.mode === 'light' ? 'border-black':'border-white'}`}>SIP</Link>
            </ul>
        </nav>
        <footer className={`${props.visibility==='visible'?'hidden':'flex'} ${props.mode === 'light' ? 'NavL text-black border-t-black':'NavD text-white border-b-white'} w-full h-[12vh] border-t items-center justify-around`}>
        <p>All Copyrights reserved &copy;</p>
    </footer>
    </div>
  )
}

export default Navbar
