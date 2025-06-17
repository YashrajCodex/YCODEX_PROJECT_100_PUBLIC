import React from 'react'

function AboutMe(props) {
    return (
        <div className={`py-5 ${props.mode === 'light' ? 'text-black bg-white' : 'text-white bg-black'}`}>
            <div className={`w-[95%] mx-auto text-[20px] border-[0.5rem] rounded-xl p-6 ${props.mode === 'light' ? 'border-black' : 'border-white'}`}>
            <div>
                <h2 className='text-center text-[40px] underline max-md:text-[20px]'><span className='text-red-500'>Password</span> <span className='text-green-500'>Labyrinth</span> <span className='text-purple-700'>Where</span> <span className='text-blue-500'>Security</span> <span className='text-orange-500'>Meets</span><span className='text-green-500'>Simplicity</span></h2>
            </div>
            <h3 className='font-bold mb-3'>In today's digital world, strong passwords are more important than ever.  The Password Labyrinth is designed to help you create unique, secure passwords effortlessly.</h3>
            <h3 className='font-bold mb-3'>Why Strong Passwords Matter?</h3>
            <h3 className='font-bold mb-3'>Weak passwords are a major cybersecurity vulnerability. Hackers often use automated tools to guess common passwords, making it crucial to create complex combinations that are difficult to crack.</h3>
            <h3 className='font-bold mb-3'>The Password Labyrinth empowers you with:</h3>
            <ul className='font-mono font-[600]'>
                <li>Customization: Choose your desired password length and include uppercase letters, lowercase letters, numbers, and symbols to create passwords tailored to your needs.</li>
                <li>Strength Meter: Get instant feedback on the generated password's strength using an industry-standard scoring system.</li>
                <li>Convenience: Easily copy the generated password to your clipboard for seamless use.</li>
                <li>Customizable Character Sets: Define your own set of characters beyond the common options for even greater password complexity.</li>
            </ul>
           <div className='font-[700] mt-5 border-2 border-black p-[5px] text-cyan-700'>
                <p>Our Mission</p>
                <p>We believe everyone deserves the protection of strong passwords. The Password Labyrinth is a simple yet powerful tool to help you safeguard your online accounts and information.</p>
           </div>
        </div>
        </div>
    )
}

export default AboutMe
