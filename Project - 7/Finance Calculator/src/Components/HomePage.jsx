import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = (props) => {
  return (
    <>
      <div className={`p-2 min-h-[85vh] ${props.mode==='light'?'TCIMBLL':'TCIMBLB'}`}>
        <div className='w-[80%] min-h-[40vh] m-auto scrollHidden'>
          <div className="cards flex flex-col gap-5">
            <Link to={'/annuity'}>Annuity</Link>
            <Link to={'/compount'}>Compound</Link>
            <Link to={'/sip'}>sip</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
