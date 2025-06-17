import React, { useState } from 'react'
import FormText from './FormText'

const Notepad = () => {
    const [noteText, setNoteText] = useState(' ');
    const [showFormText, setShowFormText] = useState(false);
    const [showFormTxt, setShowFormTxt] = useState('TextUtils');

    const handleOnNoteChange = (event)=>{
        setNoteText(event.target.value);
    }
    const swap = ()=>{
        if(showFormText === false){
            setShowFormText(true)
            setShowFormTxt('Hide')
        }else{
            setShowFormText(false)
            setShowFormTxt('TextUtils')
        }
        console.log(showFormText);
    }
  return (
    <>
        <div className={`w-full flex flex-col items-center justify-center gap-5 py-5`}>
            <textarea name="notepadArea" id="noteArea" className='w-[90%] h-[90vh] border-2 border-black rounded-lg bg-[#e3dfdf77] p-3 font-semibold placeholder:text-[#1a1a1a]' placeholder='write anything' value={noteText} onChange={handleOnNoteChange}></textarea>
            <div>
                <button className='p-3 bg-black text-white text-[20px] rounded-lg mr-4'>COPY</button>
                <button className='p-3 bg-black text-white text-[20px] rounded-lg' onClick={swap}>{showFormTxt}</button>
            </div>
        </div>
        <div className={`${showFormText === true?'inline-block':'hidden'}`}>
            <FormText/>
        </div>
    </>
  )
}

export default Notepad
