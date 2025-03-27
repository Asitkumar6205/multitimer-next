'use client';

import React, { useState } from 'react';
import { TimerProvider } from './contexts/TimerContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTimer } from './contexts/TimerContext';
import { Timer } from './types/timer';
import CategoryGroup from './components/CategoryGroup';
import AddTimerModal from './components/AddTimerModal';
import CompletionModal from './components/CompletionModal';
import ThemeSwitcher from './components/ThemeSwitcher';
import { v4 as uuidv4 } from 'uuid';

function TimerApp() {
  const { state, dispatch } = useTimer();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [completedTimer, setCompletedTimer] = useState<Timer | null>(null);

  const handleAddTimer = (name: string, duration: number, category: string) => {
    const newTimer: Timer = {
      id: uuidv4(),
      name,
      duration,
      remainingTime: duration,
      isRunning: false,
      category,
      createdAt: Date.now(),
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
  };

  const handleStart = (id: string) => {
    dispatch({ type: 'START_TIMER', payload: id });
  };

  const handlePause = (id: string) => {
    dispatch({ type: 'PAUSE_TIMER', payload: id });
  };

  const handleReset = (id: string) => {
    dispatch({ type: 'RESET_TIMER', payload: id });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TIMER', payload: id });
  };

  const handleComplete = (timer: Timer) => {
    setCompletedTimer(timer);
  };

  const handleStartAll = (category: string) => {
    state.timers
      .filter((timer) => timer.category === category)
      .forEach((timer) => handleStart(timer.id));
  };

  const handlePauseAll = (category: string) => {
    state.timers
      .filter((timer) => timer.category === category)
      .forEach((timer) => handlePause(timer.id));
  };

  const handleResetAll = (category: string) => {
    state.timers
      .filter((timer) => timer.category === category)
      .forEach((timer) => handleReset(timer.id));
  };

  const categories = Array.from(new Set(state.timers.map((timer) => timer.category)));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            MultiTimer
          </h1>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Timer
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <CategoryGroup
              key={category}
              category={category}
              timers={state.timers.filter((timer) => timer.category === category)}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onDelete={handleDelete}
              onStartAll={() => handleStartAll(category)}
              onPauseAll={() => handlePauseAll(category)}
              onResetAll={() => handleResetAll(category)}
            />
          ))}
        </div>

        <AddTimerModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTimer}
        />

        <CompletionModal
          isOpen={!!completedTimer}
          onClose={() => setCompletedTimer(null)}
          timerName={completedTimer?.name || ''}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <TimerApp />
      </TimerProvider>
    </ThemeProvider>
  );
}
