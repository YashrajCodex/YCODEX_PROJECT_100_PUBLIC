import { NavProps } from '@/Interface/GlobalInterface'
import { Target,Clock, Wind, MenuIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Navbar({ setActiveTab, activeTab }: NavProps) {
  const [show, setShow] = useState<boolean>(false)
  const ref = useRef(null)

  function handleClickOutside(e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])
  return (
      <header className="max-w-[100vw] bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Goal Tracker
            </h1>
          <MenuIcon color='blue' className='xs-min:hidden' onClick={()=> setShow((show)=> !show)}/>
            <nav className="xs-max:hidden flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab('goals')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'goals' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Goals
              </button>
              <button
                onClick={() => setActiveTab('timer')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'timer' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Clock size={16} />
                Timer
              </button>
              <button
                onClick={() => setActiveTab('breathing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'breathing' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Wind size={16} />
                Breathing
              </button>
          </nav>
          {show && <nav ref={ref} className="absolute top-14 p-2 bg-white border-slate-200 border-2 z-50 flex flex-col items-center gap-2">
              <button
                onClick={() => setActiveTab('goals')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'goals' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
              <Target/>
                Goals
              </button>
              <button
                onClick={() => setActiveTab('timer')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'timer' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Clock size={16} />
                Timer
              </button>
              <button
                onClick={() => setActiveTab('breathing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'breathing' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Wind size={16} />
                Breathing
              </button>
            </nav>}
          </div>
        </div>
      </header>
  )
}
