import React, {useState} from 'react'
import './TextUtilsStyle.css'

export default function FormText(props){
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText);
    }
    const handleLwClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
    }
    const handleCopyTextClick = () => {
        navigator.clipboard.writeText(text);
      }
    const handleResClick = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
      }
    const handleFindReplaceClick = () => {
      const find=document.getElementById("findText").value;
      const replace=document.getElementById("replaceText").value;
        if(!find || !replace){
          alert('Please enter both "Find" and "Replace" values.');
          return;
        } 
        const regex = new RegExp(find, 'g');
        const replacedText = text.replace(regex, " " + replace + " ");
        setText(replacedText);
      }
    const handleOnChange = (event)=>{
        setText(event.target.value);
    }
    const [text, setText] = useState("");
    return(
        <>
          <div className = "body-back container_textUtils w-[90vw]">
              <div className="textUtils_input">
                <h3 className={`text-${props.mode==='light'?'success':'info'}`}>{props.textAreaTitle}</h3>
                <textarea className= {`textUtils_input_area text-${props.mode==='light'?'dark':'light'} bg-${props.mode==='light'?'light':'dark'}`} placeholder='Enter your text here!' value={text} onChange={handleOnChange} id="myTextBox" rows="10"></textarea>
              </div>
              <div className="Cal_btnn">
                <button className="utilsBtn" onClick={handleUpClick}>Change to Uppercase</button>
                <button className="utilsBtn" onClick={handleLwClick}>Change to Lowercase</button>
                <button className="utilsBtn" onClick={handleCopyTextClick}>Copy Text</button>
                <button className="utilsBtn" onClick={handleResClick}>Remove Extra Space</button>
              </div>
            <div className="textUtils_wordc">
              <h4 className = {`text-${props.mode==='light'?'dark':'light'}`} >{text.split(" ").length} words and {text.length} characters.</h4>
              <h4 className = {`text-${props.mode==='light'?'dark':'light'}`} >Characters without spaces {text.match(/\S/g)?.length || 0}</h4>
            </div>
            <div className="container_wordfnd">
              <span><b>Word to Find</b></span>
              <div className='textUtils_wordfnd'>
                <input type="text" aria-label="First name" className="input_wUtils"  id='findText'/>
                <span className='input_wUtils-border'></span>
              </div>
              <span><b>Word to Replace</b></span>
              <div className='textUtils_wordfnd'>
                <input type="text" aria-label="Last name" className="input_wUtils" id='replaceText'/>
                <span className='input_wUtils-border'></span>
              </div>
              <button className="utilsBtn" onClick={handleFindReplaceClick}>Replace</button>
            </div>
          </div>
        </>
    )
}