import React from 'react'

function AboutMe(props) {
    return (
        <div className={`py-5 ${props.mode === 'light' ? 'text-black bg-white' : 'text-white bg-black'}`}>
            <div className={`w-[95%] mx-auto text-[20px] border-[0.5rem] rounded-xl p-6 ${props.mode === 'light' ? 'border-black' : 'border-white'}`}>
            <div>
                <h2 className='text-center text-[40px] underline max-md:text-[20px]'><span className='text-red-500'>Embark</span> <span className='text-purple-700'>on a</span> <span className='text-green-500'>Journey</span> <span className='text-purple-700'>of</span> <span className='text-blue-500'>Productivity</span> <span className='text-purple-700'>with</span> <span className='text-orange-500'>QuestQueue</span></h2>
            </div>
            <h3 className='font-bold mb-3'>Feeling overwhelmed by your to-do list? Let QuestQueue be your trusty companion on the path to achieving your goals. Unlike traditional list apps, QuestQueue transforms mundane tasks into an epic adventure, making productivity fun and engaging. QuestQueue uses the power of gamification to transform your to-do list into a captivating experience:</h3>
            <ul className={`font-mono font-[600] ${props.mode === 'light' ? 'text-red-900' : 'text-red-500'}`}>
                <li>Level Up System: Complete tasks and earn experience points to level up and unlock new features.</li>
                <li>Engaging Rewards: Motivate yourself with customizable rewards for completing tasks and achieving milestones.</li>
                <li>Interactive Interface: Immerse yourself in a visually appealing and interactive interface that adds a touch of fun to your daily workflow.</li>
            </ul>
            <h3 className='text-[30px]'>More Than Just a Game</h3>
            <h2>QuestQueue keeps your productivity on track with powerful features:</h2>
            <ul>
                <li>Intuitive Task Management: Effortlessly create, edit, and prioritize your tasks with a user-friendly interface.</li>
                <li>Flexible Due Dates: Set deadlines for your tasks and receive helpful reminders to stay on top of your schedule.</li>
                <li>Customizable Categories:**  Organize your tasks into categories that reflect your goals and priorities.</li>
                <li>Progress Tracking: Visually track your progress and celebrate your achievements, fueling your motivation.</li>
            </ul>
            <h3 className='text-[30px] text-yellow-500'>Tailored for Your Quest</h3>
            <h2 className='text-[25px] text-blue-500'>Simple, Intuitive, and Versatile</h2>
            <h3 className='text-[30px] text-orange-500'>QuestQueue empowers personalized productivity:</h3>
            <ul>
                <li>Customization Options: Personalize your quest by adjusting the reward system, interface themes, and notification preferences.</li>
                <li>Focus Mode: Silence distractions and focus on completing high-priority tasks with the Focus Mode feature.</li>
                <li>Cross-Device Sync: Access your tasks and keep them synchronized across your devices for seamless productivity on the go.</li>
            </ul>
           <div className='font-[700] mt-5 border-2 border-black p-[5px] text-cyan-700'>
                <p>Join the QuestQueue  Community</p>
                <p>Embrace a fun and effective approach to managing your to-do list with QuestQueue. Share your experiences, discover new ways to utilize the app, and embark on your own productivity adventure with our supportive community.</p>
           </div>
        </div>
        </div>
    )
}

export default AboutMe
