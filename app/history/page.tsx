'use client';

import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function History() {
  const { state } = useTimer();
  const { completedTimers } = state;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Timer History
            </h1>
            <ThemeSwitcher />
          </div>

          {completedTimers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No completed timers yet. Start some timers to see their history here!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {completedTimers.map((timer) => (
                <div
                  key={timer.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {timer.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {timer.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Duration:</span>{' '}
                      {formatDuration(timer.duration)}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>{' '}
                      {formatDate(timer.createdAt)}
                    </div>
                    <div>
                      <span className="font-medium">Completed:</span>{' '}
                      {timer.completedAt ? formatDate(timer.completedAt) : 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
} 