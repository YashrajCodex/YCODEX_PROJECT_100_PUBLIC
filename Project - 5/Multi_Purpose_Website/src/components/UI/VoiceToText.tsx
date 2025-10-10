
//  * Voice to Text Converter Component
//  * 
//  * Dependencies used:
//  * - Web Speech API: Browser's native speech recognition API for converting voice to text
//  * - framer-motion: Animation library for smooth transitions and interactions
//  * - React hooks: useState, useCallback, useEffect, useRef for state management and effects


import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, StopCircle } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface VoiceToTextProps {
  className?: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

// Extend the Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceToText: React.FC<VoiceToTextProps> = ({ className = '' }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);

  const { theme } = useTheme();
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  // Volume monitoring for visual feedback
  const monitorVolume = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    setVolume(Math.min(100, (average / 255) * 100 * 3)); // Amplify for better visual feedback

    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(monitorVolume);
    }
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio context for volume monitoring
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setError(null);
        monitorVolume();
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript + ' ');
        }
        setInterimTranscript(interimText);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setError(`Recognition error: ${event.error}`);
        stopRecording();
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setInterimTranscript('');
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      recognitionRef.current.start();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Failed to access microphone. Please check permissions.');
    }
  }, [isSupported, monitorVolume]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setIsRecording(false);
    setVolume(0);
    setInterimTranscript('');
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  const copyToClipboard = useCallback(async () => {
    const fullText = transcript + interimTranscript;
    if (fullText.trim()) {
      try {
        await navigator.clipboard.writeText(fullText.trim());
        // You could add a toast notification here
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    }
  }, [transcript, interimTranscript]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <motion.div
        className={`bg-gradient-surface rounded-2xl p-8 shadow-lg border border-surface-border ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
          Voice to Text Converter
        </h2>
        <div className="text-center py-8">
          <p className="text-error text-lg">
            Speech recognition is not supported in this browser.
          </p>
          <p className="text-muted-foreground mt-2">
            Please try using Chrome, Edge, or Safari.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`bg-gradient-surface rounded-2xl p-8 shadow-lg border border-surface-border ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-foreground mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Voice to Text Converter
      </motion.h2>

      {/* Recording Controls */}
      <div className="flex flex-col items-center mb-8">
        <motion.button
          onClick={isRecording ? stopRecording : startRecording}
          className={`
            relative w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300
            ${isRecording 
              ? 'bg-error hover:bg-error/90 shadow-lg' 
              : 'bg-gradient-primary hover:shadow-glow'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          {isRecording ? (
            <motion.div
              className="bg-white rounded-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StopCircle fill="red" size={64}/>
            </motion.div>
          ) : (
            <motion.i 
              className="" 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
            <PlayCircle fill={`${theme === 'dark' ? "black":"blue"}`} size={64}/>
            </motion.i>
          )}

          {/* Volume indicator */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/30"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: 1 + (volume / 100) * 0.3,
                  opacity: 0.7
                }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.1 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        <motion.p 
          className="mt-4 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isRecording ? 'Click to stop recording' : 'Click to start recording'}
        </motion.p>

        {/* Volume bars */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="flex items-end justify-center gap-1 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-primary rounded-full"
                  style={{
                    height: Math.max(4, (volume / 100) * 20 * (i + 1) / 5)
                  }}
                  animate={{
                    height: Math.max(4, (volume / 100) * 20 * (i + 1) / 5)
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-error text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript Display */}
      <AnimatePresence>
        {(transcript || interimTranscript) && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Transcript:</h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Copy
                </motion.button>
                <motion.button
                  onClick={clearTranscript}
                  className="px-4 py-2 bg-surface border border-surface-border text-surface-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
              </div>
            </div>
            <motion.div
              className="bg-surface border border-surface-border rounded-xl p-4 max-h-64 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-surface-foreground leading-relaxed">
                <span className="text-foreground">{transcript}</span>
                <span className="text-muted-foreground italic">{interimTranscript}</span>
                {isRecording && (
                  <motion.span
                    className="inline-block w-2 h-5 bg-primary ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording status */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Recording in progress...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};