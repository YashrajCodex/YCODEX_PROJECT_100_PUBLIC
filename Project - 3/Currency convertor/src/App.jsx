import { useEffect, useState } from "react";
import CurrencyConvertor from "./components/currency-convertor";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
function App() {
  useEffect(()=>{
    document.title = 'Welcome User!'
    setTimeout(() => {
      document.title = 'Convertastic: Cross-Border Conversion Engine';
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
        <Route path="/" element={<><Navbar visibility='visible'  mode= {mode} tgMode = {toggleMode} modeTxt = {modeText}/><div className="min-h-[85.4vh] flex flex-col items-center justify-center bg-image"><div className="container"><CurrencyConvertor mode = {mode}/></div></div><Navbar visibility='invisible'  mode= {mode} tgMode = {toggleMode} modeTxt = {modeText}/></>}/>
        <Route path="/about" element={<><Navbar visibility='visible'  mode= {mode} tgMode = {toggleMode} modeTxt = {modeText}/><AboutMe mode={mode}/><Navbar visibility='invisible'  mode= {mode} tgMode = {toggleMode} modeTxt = {modeText}/></>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
