/**
 * Image to Text Converter Component
 * 
 * Dependencies used:
 * - tesseract.js: OCR (Optical Character Recognition) library for extracting text from images
 * - framer-motion: Animation library for smooth transitions and interactions
 * - React hooks: useState, useCallback, useRef for state management and refs
 */

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createWorker } from 'tesseract.js';

interface ImageToTextProps {
  className?: string;
}

export const ImageToText: React.FC<ImageToTextProps> = ({ className = '' }) => {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    console.log(file.size)
    if (file.size > 10485760) {
      alert("Please enter size less than or equal to 10mb")
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setIsProcessing(true);
    setProgress(0);
    setExtractedText('');

    try {
      const worker = await createWorker('eng');
      
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?;:\'"()[]{}@#$%&*+-/=<>^_`|~\\n ',
      });

      const { data: { text } } = await worker.recognize(file);

      await worker.terminate();
      setExtractedText(text.trim());
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to extract text from image. Please try again.');
      setImage(null);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    processImage(file);
  }, [processImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleClearAll = useCallback(() => {
    setImage(null);
    setExtractedText('');
    setIsProcessing(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (extractedText) {
      try {
        await navigator.clipboard.writeText(extractedText);
        // You could add a toast notification here
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    }
  }, [extractedText]);

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
        Image to Text Converter
      </motion.h2>

      {/* File Upload Area */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragActive 
            ? 'border-primary bg-primary/5 shadow-glow' 
            : 'border-surface-border hover:border-primary/50 hover:bg-surface/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium text-foreground mb-2">
            {isDragActive ? 'Drop your image here' : 'Choose an image or drag & drop'}
          </p>
          <p className="text-sm text-muted-foreground">
            PNG, JPG, GIF up to 10MB
          </p>
        </motion.div>
      </motion.div>

      {/* Image Preview */}
      <AnimatePresence>
        {image && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-3">Preview:</h3>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img
                src={image}
                alt="Selected"
                className="w-full max-h-64 object-contain bg-surface"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Status */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="mt-6 p-4 bg-gradient-muted rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Processing...</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extracted Text */}
      <AnimatePresence>
        {extractedText && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Extracted Text:</h3>
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
                  onClick={handleClearAll}
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
              <pre className="whitespace-pre-wrap text-sm text-surface-foreground font-mono">
                {extractedText}
              </pre>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};