import { useEffect, useState } from "react";
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import CompoundI from "./Components/CompoundI"
import Navbar from "./Components/Navbar"
import AnnuityI from "./Components/AnnuityI";
import HomePage from "./Components/HomePage";

function App() {
  useEffect(()=>{
    document.title = 'Welcome User!'
    setTimeout(() => {
      document.title = 'Finance Calculator';
    }, 5000);
  }, []);
  const [mode, setMode] = useState('dark')
  const [modeText, setModeText] = useState('Dark Mode')

  const toggleMode = ()=>{
    if(mode === 'dark'){
      setMode('light')
      setModeText('Light Mode')
      console.log('Light Mode')
    }else{
      setMode('dark')
      setModeText('Dark Mode')
      console.log('Dark Mode')
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <>
            <Route 
              path="/" 
              element={<>
                <Navbar visibility='visible' modeTxt={modeText} tgMode={toggleMode} mode={mode}/>
                <HomePage mode={mode}/>
                <Navbar visibility='invisible' mode={mode}/>
              </>}/>

            <Route 
              path='/compound' 
              element={<>
                <Navbar visibility='visible' modeTxt={modeText} tgMode={toggleMode} mode={mode}/>
                <CompoundI mode={mode}/>
                <Navbar visibility='invisible' mode={mode}/>
            </>}/>

            <Route 
              path='/annuity' 
              element={<>
                <Navbar visibility='visible' modeTxt={modeText} tgMode={toggleMode} mode={mode}/>
                <AnnuityI mode={mode} visibility='visible' headTxt='Annuity' FVP='PMT'/>
                <Navbar visibility='invisible' mode={mode}/>
            </>}/>

            <Route 
              path='/sip' 
              element={<>
                <Navbar visibility='visible' modeTxt={modeText} tgMode={toggleMode} mode={mode}/>
                <AnnuityI mode={mode} visibility='invisible' headTxt='SIP' FVP='P'/>
                <Navbar visibility='invisible' mode={mode}/>
            </>}/>
          </>
        </Routes>
      </Router>
    </>
  )
}

export default App