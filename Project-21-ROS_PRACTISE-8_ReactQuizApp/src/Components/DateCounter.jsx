import { useReducer } from "react";


// useReducer declaration
// const [states, dispatch] = useReducer(pure_function, initial_state_object)
const initialStates = {count: 0, step: 0}

function ReducerFunc(state, action) {
  console.log(state, action)
  switch (action.type) {
    case 'desc':
      return { ...state, count: state.count - state.step}
    case 'inc':
      return { ...state, count: state.count + state.step }
    case 'setCount':
      return { ...state, count: action.payload }
    case 'setStep':
      return {...state, step: action.payload}
    case 'reset':
      return initialStates;
    default: throw new Error("Unknown action");

  }
}
function DateCounter() {
  const [state, reduceReturn] = useReducer(ReducerFunc, initialStates);

  const { count, step } = state;
  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    reduceReturn({type: 'desc'})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    reduceReturn({type: 'inc'});
  };

  const defineCount = function (e) {
    reduceReturn({type: 'setCount', payload: Number(e.target.value)});
  };

  const defineStep = function (e) {
    reduceReturn({type: 'setStep', payload: Number(e.target.value)});
  };

  const reset = function () {
    reduceReturn({type: 'reset'})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
