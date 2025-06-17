import React from 'react'

function AboutMe(props) {
    return (
        <div className={`py-5 ${props.mode === 'light' ? 'text-black bg-white' : 'text-white bg-black'}`}>
            <div className={`w-[95%] mx-auto text-[20px] border-[0.5rem] rounded-xl p-6 ${props.mode === 'light' ? 'border-black' : 'border-white'}`}>
            <div>
                <h2 className='text-center text-[40px] underline max-md:text-[20px]'><span className='text-red-500'>Convertastic</span> <span className='text-purple-700'>Your All-in-One</span> <span className='text-green-500'>Currency</span> <span className='text-blue-500'>Conversion</span> <span className='text-orange-500'>Engine</span></h2>
            </div>
            <h3 className='font-bold mb-3'>Welcome to the world of effortless currency conversion with Convertastic! We are your one-stop solution for navigating the ever-changing landscape of global exchange rates. Hassle-Free Conversions, Anywhere, Anytime. Convertastic empowers you to:</h3>
            <ul className='font-mono font-[600]'>
                <li>Simplify Transactions: Instantly convert currencies with a user-friendly interface and real-time exchange rates.</li>
                <li>Embrace Global Opportunities: Confidently navigate international business deals, travel adventures, or online shopping sprees.</li>
                <li>Stay Informed: Access accurate and up-to-date exchange rates for a variety of currencies, right at your fingertips.</li>
            </ul>
            <h3 className='text-[30px]'>Convertastic Keeps it Simple</h3>
            <h2>We focus on what matters most:</h2>
            <ul>
                <li>Clean and Intuitive Design: Our streamlined interface makes converting currencies a breeze.</li>
                <li>Real-Time Accuracy: Rely on reliable and constantly updated exchange rates for peace of mind.</li>
                <li>Focus on Conversion: Unlike complex financial apps, Convertastic keeps it simple by concentrating on core currency conversion functionalities.</li>
            </ul>
           <div className='font-[700] mt-5 border-2 border-black p-[5px] text-cyan-700'>
                <p>Join the Convertastic Community</p>
                <p>Convertastic is more than just a converter; it's your trusted companion in the world of international finance.</p>
           </div>
        </div>
        </div>
    )
}

export default AboutMe
