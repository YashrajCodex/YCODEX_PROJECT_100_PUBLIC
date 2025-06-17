
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Minus, Plus, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BreathingGame: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isInhaling, setIsInhaling] = useState(true);
  const [breathingRate, setBreathingRate] = useState(8); // seconds per cycle
  const [sessionCount, setSessionCount] = useState(0);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setIsInhaling(prev => !prev);
        if (isInhaling) {
          setSessionCount(prev => prev + 1);
        }
      }, (breathingRate / 2) * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, breathingRate, isInhaling]);

  useEffect(() => {
    // Generate floating particles
    setParticles(Array.from({ length: 12 }, (_, i) => i));
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setSessionCount(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsInhaling(true);
  };

  const adjustRate = (change: number) => {
    const newRate = Math.max(4, Math.min(12, breathingRate + change));
    setBreathingRate(newRate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Breathing Exercise</h1>
          <p className="text-xl text-gray-600">
            {isActive 
              ? (isInhaling ? 'Breathe In...' : 'Breathe Out...') 
              : 'Find your calm with guided breathing'
            }
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative mb-8">
          <motion.div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto"
            animate={isActive ? {
              scale: isInhaling ? 1.3 : 1,
              opacity: isInhaling ? 0.8 : 1,
            } : {}}
            transition={{
              duration: breathingRate / 2,
              ease: "easeInOut",
            }}
          />
          
          {/* Center instruction */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Wind size={48} className="mx-auto mb-2" />
              <p className="text-2xl font-medium">
                {isActive 
                  ? (isInhaling ? 'Inhale' : 'Exhale')
                  : 'Breathe'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Session Counter */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-lg text-gray-600">
              Breathing cycles: <span className="font-semibold">{Math.floor(sessionCount / 2)}</span>
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            {!isActive ? (
              <Button
                onClick={handleStart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2"
              >
                <Play size={20} />
                Start Session
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                variant="outline"
                className="px-8 py-3 rounded-full flex items-center gap-2"
              >
                <Pause size={20} />
                Stop Session
              </Button>
            )}
          </div>

          {/* Breathing Rate Control */}
          <div className="bg-white bg-opacity-80 rounded-2xl p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Breathing Rate</h3>
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => adjustRate(-1)}
                variant="outline"
                size="icon"
                disabled={breathingRate <= 4}
              >
                <Minus size={16} />
              </Button>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{breathingRate}s</p>
                <p className="text-sm text-gray-600">per cycle</p>
              </div>
              
              <Button
                onClick={() => adjustRate(1)}
                variant="outline"
                size="icon"
                disabled={breathingRate >= 12}
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {breathingRate / 2}s inhale, {breathingRate / 2}s exhale
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingGame;
