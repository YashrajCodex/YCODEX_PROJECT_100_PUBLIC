// components/ui/ConfirmModal.tsx
import React from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  isOpen: boolean;
    title?: string;
    confirmTxt?: string;
    cancelTxt?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal ({
  isOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmTxt = "Confirm",
  cancelTxt = "Cancel",
  onConfirm,
  onCancel,
}:ConfirmModalProps){
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-bg-surface rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto">
        <h2 className="text-lg font-semibold text-text-primary mb-2">{title}</h2>
        <p className="text-sm text-text-secondary mb-4">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {cancelTxt}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {confirmTxt}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
