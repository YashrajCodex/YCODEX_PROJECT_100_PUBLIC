import React, { useEffect, useRef, useState } from 'react'

export default function FlipClock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const hoursTen = Math.floor(currentTime.getHours()/10);
    const hoursOnes = currentTime.getHours() % 10;
    const minutesTens = Math.floor(currentTime.getMinutes() / 10);
    const minutesOnes = currentTime.getMinutes() % 10;
    const secondsTens = Math.floor(currentTime.getSeconds() / 10);
    const secondsOnes = currentTime.getSeconds() % 10;

    const prevTimeRef = useRef({hoursTen: hoursTen, minutesTen: minutesTens, secondsTen:secondsTens});
    let [flipHT, setFlipHT] = useState(" ");
    let [flipHO, setFlipHO] = useState(" ");
    let [flipMT, setFlipMT] = useState(" ");
    let [flipMO, setFlipMO] = useState(" ");
    let [flipST, setFlipST] = useState(" ");
    let [flipSO, setFlipSO] = useState(" ");

    useEffect(()=>{
        const timer = setInterval(() =>{
            const newTime = new Date();
            setCurrentTime(newTime);

            // checking for digit changes
            const preHours = prevTimeRef.current.hoursTen;
            const preMinutes = prevTimeRef.current.minutesTen;
            const preSeconds = prevTimeRef.current.secondsTen;

            if(newTime.getHours() !== preHours){
                setFlipHO("flip-active")
                setFlipHT("flip-active")
                setTimeout(()=>{ setFlipHO(" "); setFlipHT(" ");}, 1500)
            }
            if(newTime.getMinutes() !== preMinutes){
                setFlipMT("flip-active")
                setFlipMO("flip-active")
                setTimeout(()=> {setFlipMT(" "); setFlipMO(" ");}, 1000)
            }
            if(newTime.getSeconds() !== preSeconds){
                setFlipSO("flip-active")
                setFlipST("flip-active")
                setTimeout(()=> {setFlipSO(" "); setFlipST(" ")}, 500)
            }
            prevTimeRef.current = {
                hoursTen: newTime.getHours(),
                minutesTen: newTime.getMinutes(),
                secondsTen: newTime.getSeconds()
            }
        }, 1000)
    }, [])

    const clearTime = ()=>{
        clearInterval(timer)
    }
   
  return (
    <>
        <div className='flip-clock-container text-8xl w-100 h-[100vh] bg-black  text-white flex justify-center items-center flex-col'>

        <div className="flip-clock w-3/4 h-3/4 flex items-center justify-center">

                {/* Hours-ten */}
                <div className={`digit-inner border-[3px] border-white h-[60%] w-[16%] relative`}>
                    <div className='h-[50%] mt-20px'></div>
                    <div className='h-[50%] bg-[#080808] border-t border-black'></div>
                    <div className={`absolute ${flipHT} top-16 right-12`}>{hoursTen}</div>
                </div> 
                {/* hours-Ones */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black z-10 ${flipHO}`}></div>
                    <div className={`absolute top-16 right-12 ${flipHO}`}>{hoursOnes}</div>
                </div>
                {/* Minutes-tens */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black z-10 ${flipMT}`}></div>
                    <div className={`absolute top-16 right-12 ${flipMT}`}>{minutesTens}</div>
                </div>
                {/* minutes-Ones */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black z-10 ${flipMO}`}></div>
                    <div className={`absolute top-16 right-12 ${flipMO}`}>{minutesOnes}</div>
                </div>
                {/* seconds-Tens */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black ${flipST}`}></div>
                    <div className={`absolute top-16 right-12 ${flipST}`}>{secondsTens}</div>
                </div>
                {/* seconds-Ones */}
                <div className='digit-inner border-[3px] border-white h-[60%] w-[16%] relative'>
                    <div className='h-[50%]'></div>
                    <div className={`h-[50%] perspective bg-[#080808] border-t border-black ${flipSO}`}></div>
                    <div className={`absolute perspective top-16 right-12 ${flipSO}`}>{secondsOnes}</div>
                </div>
            
        </div>
        <p>Fliping-Flip</p>
        </div>
    </>
  )
}
