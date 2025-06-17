import React from 'react'
import { Link } from "react-router-dom"

function Navbar(props) {
  return (
    <div>
        <nav className={` ${props.visibility==='visible'? 'flex':'hidden'} h-[12vh] w-full bg-black text-white flex justify-center px-8 items-center`}>
            <div className="logo"><img className='w-[50%]' src="/YCodexFavicon.png" alt="" /></div>
            <ul className='flex gap-8'>
                <Link to='/'>Home</Link>
                <Link to='/About'>About</Link>
                <Link to='/'>Contact</Link>
            </ul>
        </nav>
        <footer className={`${props.visibility==='visible'?'hidden':'flex'} w-full h-[12vh] bg-black text-white border-t border-t-white items-center justify-around`}>
          <p>All Copyrights reserved &copy;</p>
          <div className="icccons hover:text-yellow-700">
              <a className="foot_a" target="_blank" rel='noreferrer' href="https://www.twitter.com/yashrajjoshi07"><i className="fa-brands fa-x-twitter"></i></a>
              <a className="foot_a" target="_blank" rel='noreferrer' href="https://www.aedin.com/in/yashraj-joshi-946a9b2a3"><i className="fa-brands fa-aedin"></i></a>
              <a className="foot_a" target="_blank" rel='noreferrer' href="http://www.facebook.com/yashraj.joshi.505"><i className="fa-brands fa-square-facebook"></i></a>
              <a className="foot_a" target="_blank" rel='noreferrer' href="#"><i className="fa-brands fa-whatsapp"></i></a>
              <a className="foot_a" target="_blank" rel='noreferrer' href="https://www.instagram.com/yashraj1348"><i className="fa-brands fa-instagram"></i></a>
          </div>
    </footer>
    </div>
  )
}

export default Navbar
