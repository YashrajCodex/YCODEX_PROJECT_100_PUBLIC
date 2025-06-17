import { useContext } from "react";
import { useState } from "react";



//2. Create parent component
function Counter(children:any ) {
    
    // 1. create context
    const CounterContext = useContext();
    const [count, setCount] = useState(0);
    const increase = () => setCount((c) => c + 1);
    const decrease = () => setCount((c) => c - 1);

    return <CounterContext.Provider value = {{count, increase, decrease}}>
        <span>{ children}</span>
    </CounterContext.Provider>
}

//3. create child components for different feature
function Count() {
    
}
function Increase() {
    
}
function Decrease() {
    
}
function Label() {
    
}

// 4. add child components as properties to the parent components
export default Counter;
