import React from 'react'

function Navbar(props) {
  return (
    <div>
        <nav className={`w-full h-[12vh] border-b items-center justify-around ${props.visibility==='visible'? 'flex':'hidden'} ${props.mode === 'light' ? 'bg-white text-black border-b-black':'bg-black text-white border-b-white'}`}>
        <div className="logo"><img className='max-md:ml-4 w-[50%] rounded-xl' src="/YCodexFavicon.png" alt="" /></div>
        </nav>
    </div>
  )
}

export default Navbar
