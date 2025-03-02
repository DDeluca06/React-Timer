// src/hooks/useTimerLogic.jsx
import { useState, useCallback } from 'react';

export const useTimerLogic = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // Default: 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(1500); // Default: 25 minutes in seconds
  const [isRunning, setRunning] = useState(false);
  const [isDebounced, setIsDebounced] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Start timer function
  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setRunning(true);
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(newIntervalId);
      setIsDebounced(true);
      setTimeout(() => {
        setIsDebounced(false);
      }, 1000);
    }
  }, [isRunning, timeLeft]);

  // Stop timer function
  const stopTimer = useCallback(() => {
    setRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsDebounced(true);
    setTimeout(() => {
      setIsDebounced(false);
    }, 1000);
  }, [intervalId]);

  // Reset timer function
  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(totalTime); // Reset to the current totalTime
    setIsDebounced(true);
    setTimeout(() => {
      setIsDebounced(false);
    }, 1000);
  }, [stopTimer, totalTime]);

  // Updates our totalTime state
  const updateTotalTime = useCallback((newTotalTime) => {
    setTotalTime(newTotalTime);
    setTimeLeft(newTotalTime); // Reset timeLeft to the new totalTime
  }, []);

  return {
    timeLeft,
    totalTime,
    isRunning,
    isDebounced,
    startTimer,
    stopTimer,
    resetTimer,
    updateTotalTime,
    intervalId,
    setTimeLeft,
  };
};