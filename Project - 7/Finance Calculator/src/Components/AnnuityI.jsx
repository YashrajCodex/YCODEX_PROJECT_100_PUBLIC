import React, { useState } from 'react'

function AnnuityI(props) {
    const inpStyle = 'w-full font-[650] rounded-[19px] p-[10px] border-[1.9px] border-[#5a5454] focus:outline-none focus:border-[#5C6BC0]'
    const [resultStyle, setResultStyle] = useState("hidden")
    const [anIPrincipal, setAnIPrincipal] = useState('');
    const [anInterest, setAnInterest] = useState('');
    const [anTime, setAnTime] = useState('');
    const [FVAmount, setFVAmount] = useState(0);
    const [PVAmount, setPVAmount] = useState(0);
    const [Error, setError] = useState('hidden')
    
    const handleCIPChange = (e)=>{
        let newValue = e.target.value;
        if(e.target.type === 'number'){
            setAnIPrincipal(Number(newValue));
        }
    }
    const handleCIIChange = (e)=>{
        let newValue = e.target.value;
        if(e.target.type === 'number'){
            setAnInterest(Number(newValue));
        }
    }
    const handleCITChange = (e)=>{
        let newValue = e.target.value;
        if(e.target.type === 'number'){
            setAnTime(Number(newValue));
        }
    }

    const AnFVCalculate = ()=>{
        if(!anIPrincipal || !anInterest || !anTime){
            setError('inline-block')
            console.log("Error, unfilled inputs!")
            return;
        }
        setError('hidden')

        let roim = (anInterest/100) /12; //rate of interest per month
        let Rn = (Math.pow((1 + roim), (12 * anTime)) -1);
        
        const FVV = (anIPrincipal * Rn/roim).toFixed(2);
        setFVAmount(FVV);
        setResultStyle('flex');
        // FV = PMT × [((1 +r/n) ^ (n*t)) -1]/(r/n)
    }

    const AnPVCalculate = ()=>{
        if(!anIPrincipal || !anInterest || !anTime){
            setError('inline-block');
            console.log("Error, unfilled inputs!");
            return;
        }
        setError('hidden')

        let roim = (anInterest/100) /12; //rate of interest per month
        let Rn = (Math.pow((1+roim), -(anTime * 12)));
        const PVV = anIPrincipal * [(1 - Rn)/roim];

        setPVAmount(PVV.toFixed(2));
        setResultStyle('flex');
        // PV = PMT × [(1 - (1 + r)^-n)/r]
    }
  return (
    <>
      <main className={`${props.mode==='light'?'TCIMBLL':'TCIMBLB'} w-full min-h-[85vh] flex justify-center items-center py-[2%] flex-col`}>
            <div className={`calculator glass ${props.mode==='light'?'glassL':'glassD'} w-1/2 max-md:w-[97%] h-auto border-2 border-white p-[1%] text-center flex flex-col justify-evenly items-center`}>
                <h3 className='CITBL w-[95%] rounded-md text-white flex gap-3 justify-center text-[25px] max-md:text-[20px] font-bold'>
                    <span className='text-orange-500'>{props.headTxt}</span>
                    <span>Amount</span>
                    <span className='text-green-500'>Calculator</span>
                </h3>
                <span className={`font-bold text-red-500 tracking-widest ${Error}`}>*Must  fill  all  the  inputs</span>
                <div className='flex flex-col gap-2 w-[90%]'>
                    <label htmlFor="principal_an" className='cursor-pointer'>{props.FVP}: Principal Amount/Month
                        <input required={true} id='principal_an' className={`CI_Input ${inpStyle} ${props.mode==='light'? 'CI_InputL focus:bg-[#ffffffb0]':'CI_InputD focus:bg-[#000000b0]'}`} autoFocus={true} type="number" onChange={handleCIPChange} placeholder="Principal Amount/Month" value={anIPrincipal}/>
                    </label>
                    <label htmlFor="interest_an"></label>Interest: Fixed Rate of Interest/Year
                        <input required={true} id='interest_an' className={`CI_Input ${inpStyle} ${props.mode==='light'? 'CI_InputL focus:bg-[#ffffffb0]':'CI_InputD focus:bg-[#000000b0]'}`} type="number" value={anInterest} onChange={handleCIIChange} placeholder="Fixed Rate of Interest/Year"/>
                    <label htmlFor="time_an">Time: Time (Years)
                        <input required={true} id='time_an' className={`CI_Input ${inpStyle} ${props.mode==='light'? 'CI_InputL focus:bg-[#ffffffb0]':'CI_InputD focus:bg-[#000000b0]'}`} type="number" value={anTime} onChange={handleCITChange} placeholder="Time (Years)"/>
                    </label>
                </div>
                <div>
                    <button className={`button1 border border-[#ccc] p-4 w-[12rem] m-1 cursor-pointer font-medium max-md:font-bold max-md:text-[12px] rounded-2xl select-none ${props.mode==='light'?'button1L':'button1D'}`} onClick={AnFVCalculate}>Calculate Future Value</button>
                    <button className={`${props.visibility==='visible'? 'inline-block':'hidden'} button1 border border-[#ccc] p-4 w-[12rem] m-1 cursor-pointer font-medium max-md:font-bold max-md:text-[12px] rounded-2xl select-none ${props.mode==='light'?'button1L':'button1D'}`} onClick={AnPVCalculate}>Calculate Present Value</button>
                </div>
                <div className={`flex flex-col w-[80%] gap-5`}>
                    <div className={`text-[15px] tracking-wider font-semibold ${resultStyle} items-center justify-between`}>
                        <p>Future Value after {`${anTime} years`} compounded {anTime * 12} times is: <span className="result1_2 text-green-500 w-1/2">{`${FVAmount}`}</span></p>
                    </div>
                    <div className={`text-[15px] tracking-wider font-semibold ${props.visibility==='visible'? 'inline-block':'hidden'} ${resultStyle} items-center justify-between`}>
                        <p>Present Value after {`${anTime} years`} compounded {anTime * 12} times is: <span className="result2_2 text-green-500 w-1/2">{`${PVAmount}`}</span></p>
                    </div>
                </div>
                <div className='font-[600]'>
                    <h3 className='text-[1.2rem]'><span>Formula for future value of principal is:</span> FV = {props.FVP} × [((1 +r/n) ^ (n*t)) -1]/(r/n)</h3>
                    <h3 className={`text-[1.2rem] ${props.visibility==='visible'? 'inline-block':'hidden'}`}><span>Formula for present value of principal is:</span>  PV = PMT × [(1 - (1 + r)^-n)/r]</h3>
                </div>

            </div>
        </main>
    </>
  )
}

export default AnnuityI
