'use client';

import React, { createContext, useContext, useReducer, useEffect, useState, useRef } from 'react';
import { Timer } from '../types/timer';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TimerState {
  timers: Timer[];
  completedTimers: Timer[];
}

type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'COMPLETE_TIMER'; payload: Timer };

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
} | null>(null);

const initialState: TimerState = {
  timers: [],
  completedTimers: [],
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload),
      };
    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, isRunning: true }
            : timer
        ),
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, isRunning: false }
            : timer
        ),
      };
    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, remainingTime: timer.duration, isRunning: false }
            : timer
        ),
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };
    case 'COMPLETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload.id),
        completedTimers: [...state.completedTimers, action.payload],
      };
    default:
      return state;
  }
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [savedState, setSavedState] = useLocalStorage('timer-state', initialState);
  const [state, dispatch] = useReducer(timerReducer, savedState);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const timerRefs = useRef<{ [key: string]: Timer }>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setSavedState(state);
    }
  }, [state, setSavedState, isClient]);

  // Update timer refs when state changes
  useEffect(() => {
    state.timers.forEach(timer => {
      timerRefs.current[timer.id] = timer;
    });
  }, [state.timers]);

  // Handle timer updates in the background
  useEffect(() => {
    // Clear all existing intervals
    Object.values(intervalRefs.current).forEach(clearInterval);
    intervalRefs.current = {};

    // Set up new intervals for running timers
    state.timers.forEach((timer) => {
      if (timer.isRunning) {
        intervalRefs.current[timer.id] = setInterval(() => {
          const currentTimer = timerRefs.current[timer.id];
          if (currentTimer && currentTimer.remainingTime > 0) {
            dispatch({
              type: 'UPDATE_TIMER',
              payload: {
                ...currentTimer,
                remainingTime: currentTimer.remainingTime - 1,
              },
            });
          } else if (currentTimer) {
            dispatch({
              type: 'COMPLETE_TIMER',
              payload: {
                ...currentTimer,
                completedAt: Date.now(),
              },
            });
          }
        }, 1000);
      }
    });

    // Cleanup function
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [state.timers]);

  if (!isClient) {
    return null;
  }

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 