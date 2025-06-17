import { useState } from "react";
import DateTime from "./DateTime";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const life = [
      {
        sleep: false,
      },
  ]
  //react is about immutability

  const handlePrevious = () => {
    setStep((step) => (step > 1 ? step - 1 : step));
  };
  const handleNext = () => {
    setStep((step) => (step < 3 ? step + 1 : step));
  };
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="close">
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <DateTime/>
      <p>{ !life[0].sleep ? "true" : "false" }</p>
    </>
  );
};

export default App;
