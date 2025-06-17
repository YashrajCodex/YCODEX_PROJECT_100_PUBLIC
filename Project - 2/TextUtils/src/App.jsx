import { useEffect } from 'react'
import Navbar from './Components/Navbar'
import FormText from './Components/FormText'
import AboutMe from './Components/AboutMe'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  useEffect(()=>{
    document.title = "Welcome User!";
    setTimeout(() => {
      document.title = 'TextUtils: The Content Chameleon -  Your Swiss Army Knife for Text Manipulation'
    }, 5000);
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={
            <>
              <Navbar visibility='visible'/><FormText/><Navbar visibility='invisible'/>
            </>
          }/>
          <Route 
            path='/About' 
            element={
            <>
              <Navbar visibility='visible'/><AboutMe/><Navbar visibility='invisible'/>
            </>
          }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
