'use client';

import React from 'react';
import { Timer } from '../types/timer';
import ProgressBar from './ProgressBar';
import { useTimer } from '../contexts/TimerContext';

interface TimerItemProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: { [key: string]: { bg: string; text: string; border: string } } = {
  Work: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800'
  },
  Break: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800'
  },
  Exercise: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800'
  },
  Study: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800'
  },
  Other: {
    bg: 'bg-gray-50 dark:bg-gray-900/20',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-800'
  }
};

const TimerItem: React.FC<TimerItemProps> = ({
  timer,
  onStart,
  onPause,
  onReset,
  onDelete,
}) => {
  const progress = timer.duration - timer.remainingTime;
  const percentage = Math.round((progress / timer.duration) * 100);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get category colors or default to Other category colors
  const categoryColors = CATEGORY_COLORS[timer.category] || CATEGORY_COLORS.Other;

  return (
    <div className={`p-4 rounded-lg shadow-sm border ${categoryColors.bg} ${categoryColors.border}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {timer.name}
        </h3>
        <span className={`text-sm font-medium ${categoryColors.text}`}>
          {timer.category}
        </span>
      </div>

      <div className="mt-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
        <ProgressBar
          progress={progress}
          total={timer.duration}
          color={timer.isRunning ? 'bg-green-500' : categoryColors.text.replace('text-', 'bg-')}
        />
      </div>

      <div className="text-center mb-4">
        <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
          {formatTime(timer.remainingTime)}
        </span>
      </div>

      <div className="flex gap-2">
        {!timer.isRunning ? (
          <button
            onClick={() => onStart(timer.id)}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => onPause(timer.id)}
            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Pause
          </button>
        )}
        <button
          onClick={() => onReset(timer.id)}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => onDelete(timer.id)}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimerItem; 