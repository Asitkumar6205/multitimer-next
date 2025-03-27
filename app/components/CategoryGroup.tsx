'use client';

import React, { useState, useEffect } from 'react';
import { Timer } from '../types/timer';
import TimerItem from './TimerItem';
import ProgressBar from './ProgressBar';

interface CategoryGroupProps {
  category: string;
  timers: Timer[];
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onStartAll: () => void;
  onPauseAll: () => void;
  onResetAll: () => void;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  timers,
  onStart,
  onPause,
  onReset,
  onDelete,
  onStartAll,
  onPauseAll,
  onResetAll,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalDuration = timers.reduce((sum, timer) => sum + timer.duration, 0);
  const totalRemaining = timers.reduce((sum, timer) => sum + timer.remainingTime, 0);
  const progress = totalDuration - totalRemaining;

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {category}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onStartAll}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Start All
          </button>
          <button
            onClick={onPauseAll}
            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Pause All
          </button>
          <button
            onClick={onResetAll}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>Overall Progress</span>
          <span>{Math.round((progress / totalDuration) * 100)}%</span>
        </div>
        <ProgressBar
          progress={progress}
          total={totalDuration}
          color="bg-blue-500"
        />
      </div>

      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${
          isExpanded 
            ? 'opacity-100 max-h-[2000px] pointer-events-auto' 
            : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        {timers.map((timer) => (
          <div key={timer.id} className={isExpanded ? 'block' : 'hidden'}>
            <TimerItem
              timer={timer}
              onStart={onStart}
              onPause={onPause}
              onReset={onReset}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup; 