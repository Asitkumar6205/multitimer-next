'use client';

import { useEffect, useRef } from 'react';
import { useTimer as useTimerContext } from '../contexts/TimerContext';
import { Timer } from '../types/timer';

export function useTimer(timer: Timer) {
  const { dispatch } = useTimerContext();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        if (timer.remainingTime > 0) {
          dispatch({
            type: 'UPDATE_TIMER',
            payload: {
              ...timer,
              remainingTime: timer.remainingTime - 1,
            },
          });
        } else {
          dispatch({
            type: 'COMPLETE_TIMER',
            payload: timer,
          });
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, timer.remainingTime, timer, dispatch]);

  const start = () => {
    dispatch({ type: 'START_TIMER', payload: timer.id });
  };

  const pause = () => {
    dispatch({ type: 'PAUSE_TIMER', payload: timer.id });
  };

  const reset = () => {
    dispatch({ type: 'RESET_TIMER', payload: timer.id });
  };

  const deleteTimer = () => {
    dispatch({ type: 'DELETE_TIMER', payload: timer.id });
  };

  return {
    start,
    pause,
    reset,
    deleteTimer,
  };
} 