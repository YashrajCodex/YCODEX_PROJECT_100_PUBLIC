import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

const PassGeneComp = (props) => {
    let [passUseCount, setPassUseCount] = useState(0)
    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(8);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    const generatePassword = () => {
        // Logic to build the password based on user choices
        // Here's an example using character sets:
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()';
    
        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
          newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        setPassUseCount(passUseCount = passUseCount + 1)
        // localStorage.setItem("storePass", newPassword)
        localStorage.setItem("storePassRange", passwordLength)
      };
      useEffect(()=>{
        // let getPass = localStorage.getItem("storePass");
        // setPassword(getPass);
        let getPassrange = localStorage.getItem("storePassRange");
        setPasswordLength(getPassrange);
      },[])

      const clearCount = ()=>{
        setPassUseCount(0)
      }
    
    return (
        <div className='passGenContainer max-md:w-[97%]'>
            <h1>The Password Labyrinth</h1>
            <div className="buttonbtn text-center relative select-none">{`App Usage ${passUseCount}`} <span className='text-[10px] absolute right-2 bottom-3 cursor-pointer' onClick={clearCount}>Clear</span> </div>
            <div className="passInerContainer">
                <label className='laberInput'><button className='buttonbtn' onClick={()=>{navigator.clipboard.writeText(password);}}>copy</button><input type="text" id='passGenInput' value={password} disabled /></label> 
                <div>
                    <label className='labelpassgencontain'>Length: {`${passwordLength}`}
                        <input type="range" onClick={generatePassword} id='passGenLen' value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} min="4" max="24"/>
                        
                    </label>
                </div>
                <div className='passGenLabel'>
                    <p>S e t t i n g</p>
                    <label className='labelpassgencontain'>Uppercase Letters
                        <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)}/> <span className='slider'></span>
                    </label>
                    <label className='labelpassgencontain'>Lowercase Letters
                        <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)}/> <span className='slider'></span>
                    </label>
                    <label className='labelpassgencontain'>Numbers
                        <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}/> <span className='slider'></span>
                    </label>
                    <label className='labelpassgencontain'>Symbols
                        <input type="checkbox" checked={includeSymbols} onChange={(e) =>setIncludeSymbols(e.target.checked)}/> <span className='slider'></span>
                    </label>
                </div>
                <button className='buttonbtn passgenconbtn' onClick={generatePassword}>Generate Password</button>
            </div>
        </div>
    )
}

export default PassGeneComp