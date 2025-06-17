import { useState } from 'react';
import ListPage from './Components/ListPage';
import Navbar from './Components/Navbar';
import AboutMe from './Components/AboutMe';
import { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  useEffect(()=>{
    document.title = 'Welcome User!'
    setTimeout(() => {
      document.title = 'QuestQueue: Your Adventure Awaits';
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
          <Route path='/' element={<><Navbar visibility='visible'  mode= {mode} tgMode = {toggleMode} modeTxt = {modeText}/><ListPage mode={mode}/><Navbar visibility='invisible' mode= {mode}/></>}/>
          <Route path='/about' element={<><Navbar visibility='visible'  mode= {mode} tgMode = {toggleMode} modeTxt = {modeText}/><AboutMe mode={mode}/><Navbar visibility='invisible' mode= {mode}/></>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App