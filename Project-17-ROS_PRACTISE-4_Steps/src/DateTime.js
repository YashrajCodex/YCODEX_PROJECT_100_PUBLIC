import React, { useState } from "react";

const DateTime = () => {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const onCountClickN = () => {
    setCount((count) => count + step);
  };
  const onCountClickP = () => {
    setCount((count) => count - step);
  };
  const onStepClickN = () => {
    setStep((Step) => Step + 1);
  };
  const onStepClickP = () => {
    setStep((Step) => Step - 1);
  };
  const date = new Date();
  date.setDate(date.getDate() + count);
  return (
    <>
      <div style={{ display: "flex", marginLeft: "50%" }}>
        <button onClick={onStepClickP}>-</button>
        <p>Step: {step}</p>
        <button onClick={onStepClickN}>+</button>
      </div>
      <div style={{ display: "flex", marginLeft: "50%" }}>
        <button onClick={onCountClickP}>-</button>
        <p>Count: {count}</p>
        <button onClick={onCountClickN}>+</button>
      </div>
      <h3 style={{marginLeft: "40%"}}>
        {count} from /was Today is {date.toDateString()}
      </h3>
    </>
  );
};

export default DateTime;
