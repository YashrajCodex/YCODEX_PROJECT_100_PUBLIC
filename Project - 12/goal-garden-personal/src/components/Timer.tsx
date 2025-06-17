
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Switch session type when time runs out
      if (sessionType === 'work') {
        setSessionType('break');
        setTimeLeft(breakDuration * 60);
      } else {
        setSessionType('work');
        setTimeLeft(workDuration * 60);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, sessionType, workDuration, breakDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(sessionType === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const handleStop = () => {
    setIsActive(false);
    setSessionType('work');
    setTimeLeft(workDuration * 60);
  };

  const progress = sessionType === 'work' 
    ? ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100
    : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;

  return (
    <div className="max-w-md mx-auto text-center">
      {/* Short-heading */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {sessionType === 'work' ? 'Work Session' : 'Break Time'}
          </h2>
          <p className="text-lg font-medium text-gray-600">
            {sessionType === 'work' ? 'Stay focused!' : 'Take a breather'}
          </p>
        </div>

        {/* Circular Progress */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke={sessionType === 'work' ? '#3b82f6' : '#10b981'}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isActive ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-mono font-bold text-gray-900">
                {formatTime(timeLeft)}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {!isActive ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-2xl transition-colors"
            >
              <Play size={28} />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePause}
              className="w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center text-2xl transition-colors"
            >
              <Pause size={28} />
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="w-16 h-16 rounded-full bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center text-2xl transition-colors"
          >
            <RotateCcw size={28} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStop}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-2xl transition-colors"
          >
            <Square size={28} />
          </motion.button>
        </div>

        {/* Settings Toggle */}
        <Button
          onClick={() => setShowSettings(!showSettings)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Settings
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timer Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Work Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setWorkDuration(value);
                  if (sessionType === 'work' && !isActive) {
                    setTimeLeft(value * 60);
                  }
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 w-20 text-center"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Break Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={breakDuration}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setBreakDuration(value);
                  if (sessionType === 'break' && !isActive) {
                    setTimeLeft(value * 60);
                  }
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 w-20 text-center"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Timer;
