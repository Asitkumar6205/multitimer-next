'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  color = 'bg-blue-500',
}) => {
  const percentage = (progress / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar; 