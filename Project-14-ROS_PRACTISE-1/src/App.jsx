import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [advice, setAdvice] = useState("click on the button below to get new advice!");
  const [id, setId] = useState("");
  const [clickedBtn, setClickedBtn] = useState(0);
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json()
    const adviceData = data.slip.advice;
    const IdData = data.slip.id;
    setAdvice(`) ${adviceData}`);
    setId(`${IdData}`);
    setClickedBtn((c) => c+1);
  }

  useEffect(function () {
    getAdvice();
  }, [])
  return (
    <> 
      <h2>{id}{advice}</h2>
      <button onClick={getAdvice}>Get advice</button>
      <Message clickedBtn = {clickedBtn}/>
    </>
  )
}

function Message(props) {
  return(
    <p>You have clicked the button {props.clickedBtn} times.</p>
  )}
export default App
