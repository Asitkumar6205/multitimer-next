'use client';

import React from 'react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerName: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  timerName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md text-center transform transition-all">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Timer Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {timerName} has finished. Great job!
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompletionModal; 