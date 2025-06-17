import React, { useEffect, useRef, useState } from 'react'

function FlipTimer() {
     // <--------------------------flip timer------------------------------->

    //  input values
     let [timerHour, setTimerHour] = useState(0o0);
     let [timerMin, setTimerMin] = useState(0+0);
     let [timerSec, setTimerSec] = useState(0+0);

    //  timer, activating and remainingTime values
    const [hoursTenT, setHoursTenT] = useState(0)
    const [hoursOnesT, setHoursOnesT] = useState(0)
    const [minutesTensT, setMinutesTensT] = useState(0)
    const [minutesOnesT, setMinutesOnesT] = useState(0)
    const [secondsTensT, setSecondsTensT] = useState(0)
    const [secondsOnesT, setSecondsOnesT] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [remainingTime, setRemainingTime] = useState(0)
    const inputRef = useRef(null)

    const combinedChange = {timerHour, timerMin, timerSec}
 
    const handleTimerHour = (e)=>{
        setTimerHour(e.target.value);
    if(timerHour.length>1){
        setTimerHour("")
    }
    }
    const handleTimerMin = (e)=>{
    setTimerMin(e.target.value);
    if(timerMin.length>1){
        setTimerMin("")
    }
    }
    const handleTimerSec = (e)=>{
    setTimerSec(e.target.value);
    if(timerSec.length>1){
        setTimerSec("")
    }
    }

    useEffect(()=>{
    let parsedValue = combinedChange;
    
    if(parsedValue !== null){
        
        setHoursTenT(Math.min((Math.floor(parsedValue.timerHour / 10)), 2))
        setHoursOnesT(Math.min((parsedValue.timerHour % 10), 3))
        setMinutesTensT(Math.min((Math.floor(parsedValue.timerMin / 10)), 5))
        setMinutesOnesT(Math.min((parsedValue.timerMin % 10), 9))
        setSecondsTensT(Math.min((Math.floor(parsedValue.timerSec / 10)), 5))
        setSecondsOnesT(Math.min((parsedValue.timerSec % 10), 9))

    }

    },[combinedChange])

    const handleStart = ()=>{
        setIsActive(true);
        setRemainingTime(timerHour * 3600 + timerMin * 60 + timerSec)
    }

    // timer code
    useEffect(()=>{
        if(isActive && remainingTime > 0 ){
            const intervalTimer = setInterval(() => {
                setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);
            return () => clearInterval(intervalTimer)
        }
    }, [isActive, remainingTime])

    const handleStop = ()=>{
        setIsActive(false);
    }
    const handleReset = ()=>{
        setIsActive(false);
        setRemainingTime(0)
        setTimerHour(0)
        setTimerMin(0)
        setTimerSec(0)
    }
    
  return (
    <div className='flipClock-timer-container text-8xl w-100 h-[100vh] bg-black  text-white flex justify-start items-center flex-col'>

        <div className="flip-clock w-3/4 h-3/4 flex items-center justify-center">

                {/* Hours-ten */}
                <div className={`digit-inner border-[3px] border-white h-[60%] w-[16%] relative`}>
                    <div className='h-[50%] mt-20px'></div>
                    <div className='h-[50%] bg-[#080808] border-t border-black'></div>
                    <div className={`absolute top-16 right-12`}>{hoursTenT}</div>
                </div> 
                {/* hours-Ones */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black z-10`}></div>
                    <div className={`absolute top-16 right-12`}>{hoursOnesT}</div>
                </div>
                {/* Minutes-tens */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black z-10`}></div>
                    <div className={`absolute top-16 right-12`}>{minutesTensT}</div>
                </div>
                {/* minutes-Ones */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black z-10`}></div>
                    <div className={`absolute top-16 right-12`}>{minutesOnesT}</div>
                </div>
                {/* seconds-Tens */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black`}></div>
                    <div className={`absolute top-16 right-12`}>{secondsTensT}</div>
                </div>
                {/* seconds-Ones */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black`}></div>
                    <div className={`absolute perspective top-16 right-12`}>{secondsOnesT}</div>
                </div>
            
        </div>
            <h3 className='tracking-wider'>{remainingTime}</h3>
        <div className='flex text-2xl text-cyan-700 gap-2 mb-3'>
            <input type="number" name='hour' onChange={handleTimerHour} value={timerHour} placeholder='Enter hour' className='h-[5vh] p-4 rounded-md bg-slate-900 text-center'/>
            <input type="number" name='minutes' onChange={handleTimerMin} value={timerMin} placeholder='Enter minutes' className='h-[5vh] p-4 rounded-md bg-slate-900 text-center'/>
            <input type="number" name='seconds' ref={inputRef} onChange={handleTimerSec} value={timerSec} placeholder='Enter seconds' className='h-[5vh] p-4 rounded-md bg-slate-900 text-center'/>
        </div>
        <div className='flex flex-wrap gap-2'>
            <button className='p-2 bg-slate-900 text-cyan-400 rounded-md text-4xl tracking-wider' onClick={handleStop}>Stop</button>
            <button className='p-2 bg-slate-900 text-cyan-400 rounded-md text-4xl tracking-wider' onClick={handleStart}>Start</button>
            <button className='p-2 bg-slate-900 text-cyan-400 rounded-md text-4xl tracking-wider' onClick={handleReset}>Reset</button>

        </div>
        </div>
  )
}

export default FlipTimer
