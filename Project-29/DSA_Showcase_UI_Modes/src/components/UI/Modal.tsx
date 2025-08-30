
import React from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-1/2 h-1/2 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-700  dark:text-white hover:text-red-400 transition"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
