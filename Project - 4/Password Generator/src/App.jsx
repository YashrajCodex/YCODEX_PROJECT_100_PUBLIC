import { useEffect, useState } from 'react'
import PassGeneComp from './Components/PassGeneComp'
import Navbar from './Components/Navbar'
import AboutMe from './Components/AboutMe'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  useEffect(()=>{
    document.title = 'Welcome User!'
    setTimeout(() => {
      document.title = 'The Password Labyrinth: Where Security Meets Simplicity';
    }, 5000);
  }, []);
  // const [mode, setMode] = useState('dark')
  // const [modeText, setModeText] = useState('Dark Mode')

  // const toggleMode = ()=>{
  //   if(mode === 'dark'){
  //     setMode('light')
  //     setModeText('Light Mode')
  //     console.log('Light Mode')
  //   }else{
  //     setMode('dark')
  //     setModeText('Dark Mode')
  //     console.log('Dark Mode')
  //   }
  // }
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><Navbar visibility='visible'/><PassGeneComp/><Navbar visibility='invisible'/></>}/>
        <Route path='/about' element={<><Navbar visibility='visible'/><AboutMe/><Navbar visibility='invisible'/></>}/>
      </Routes>
    </Router>
        {/* <button className='buttonbtn' onClick={toggleMode}>
          count is {modeText}
        </button> */}
      
      
      
    </>
  )
}

export default App
