import { useState } from "react";
import words from "./wordsList.json";
import Message from "./ui/Message";
import HangmanDrawing from "./Features/HangmanDrawing";
import HangmanWord from "./Features/HangmanWord";
import HangmanKeyboard from "./Features/HangmanKeyboard";
// import Counter from "./Features/CompoundComponent/Counter"

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });
const[gussedLetters, setGuessedLetters] = useState<string[]>([])
  return <div className="container1">
    <Message message = "losss and win!"/>
    <HangmanDrawing/>
    <HangmanWord/>
    <HangmanKeyboard/>
    {/* <Counter>hello</Counter> */}
  </div>;
}

export default App;
