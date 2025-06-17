import React, { useState } from 'react'

function CompoundI(props) {
    const inpStyle = 'w-full font-[650] rounded-[19px] p-[10px] border-[1.9px] border-[#5a5454] focus:outline-none focus:border-[#5C6BC0]'
    const [resultStyle, setResultStyle] = useState("hidden")
    const [cIPrincipal, setCIPrincipal] = useState();
    const [cIInterest, setCIInterest] = useState();
    const [cITime, setCITime] = useState();
    const [CIAmount, setCIAmount] = useState(0);
    const [CIProfit, setCIProfit] = useState(0);
    const [Error, setError] = useState('hidden')
    
    const handleCIPChange = (e)=>{
        setCIPrincipal(e.target.value);
    }
    const handleCIIChange = (e)=>{
        setCIInterest(e.target.value);
    }
    const handleCITChange = (e)=>{
        setCITime(e.target.value);
    }

    const CICalculate = ()=>{

        if(!cIPrincipal || !cIInterest || !cITime){
            setError('inline-block')
            console.log("Error, unfilled inputs!")
            return;
        }
        setError('hidden')

        let CIIntPercent = cIInterest/100;
        let calCIAmount = (cIPrincipal * Math.pow(1 + CIIntPercent, cITime)).toFixed(2)
        let calCIProfit = (calCIAmount - cIPrincipal).toFixed(2)

        setCIAmount(calCIAmount);
        setCIProfit(calCIProfit);

        setResultStyle("flex")
        console.log(CIAmount, CIProfit)
    }
  return (
    <>
        <main className={`${props.mode==='light'?'TCIMBLL':'TCIMBLB'} w-full  text-white h-[85vh] flex justify-center items-center py-[2%]`}>
            <div className={`calculator glass ${props.mode==='light'?'glassL':'glassD'} w-1/2 max-md:w-[97%] h-full border-2 border-white p-[1%] text-center flex flex-col justify-evenly items-center`}>
                <h3 className='CITBL w-[95%] rounded-md text-white flex gap-3 justify-center text-[25px] font-bold'>
                    <span className='text-orange-500'>Compound</span>
                    <span>Interest</span>
                    <span className='text-green-500'>Calculator</span>
                </h3>
                <span className={`font-bold text-red-500 tracking-widest ${Error}`}>*Must  fill  all  the  inputs</span>
                <div className='flex flex-col gap-2 w-[90%]'>
                    <input required={true} className={`CI_Input ${inpStyle} ${props.mode==='light'? 'CI_InputL focus:bg-[#ffffffb0]':'CI_InputD focus:bg-[#000000b0]'}`} autoFocus={true} type="number" onChange={handleCIPChange} placeholder="Principal Amount" value={cIPrincipal}/>
                    <input required={true} className={`CI_Input ${inpStyle} ${props.mode==='light'? 'CI_InputL focus:bg-[#ffffffb0]':'CI_InputD focus:bg-[#000000b0]'}`} type="number" value={cIInterest} onChange={handleCIIChange} placeholder="Interest Rate"/>
                    <input required={true} className={`CI_Input ${inpStyle} ${props.mode==='light'? 'CI_InputL focus:bg-[#ffffffb0]':'CI_InputD focus:bg-[#000000b0]'}`} type="number" value={cITime} onChange={handleCITChange} placeholder="Time (Years)"/>
                </div>
                <button className={`button1 border border-[#ccc] p-4 w-[9rem] m-1 cursor-pointer font-extrabold rounded-2xl select-none ${props.mode==='light'?'button1L':'button1D'}`} onClick={CICalculate}>Calculate</button>

                <div className={`${resultStyle} flex-col`}>
                    <div className={`text-[20px] tracking-wider font-semibold flex w-1/2 items-center justify-between`}>
                        <p>Amount:</p>
                        <p className="result1_2 text-green-500">{CIAmount}</p>
                    </div>
                    <div className={`text-[20px] tracking-wider font-semibold flex w-[15vw] items-center justify-between`}>
                        <p>Profit:</p>
                        <p className="result2_2 text-green-500">{CIProfit}</p>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default CompoundI
