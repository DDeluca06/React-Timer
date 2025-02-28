import React, { createContext, useState, useCallback, useEffect } from 'react';
import useSessions from '../../hooks/useSessions';
import { toast } from 'react-toastify';

// Create context
export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(1500); // Default: 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(1500); // Default: 25 minutes in seconds
  const [isRunning, setRunning] = useState(false);
  const [isDebounced, setIsDebounced] = useState(false); // Debounce state, prevents multiple clicks
  const [intervalId, setIntervalId] = useState(null);

  // useSessions hook
  const { sessions, streak, startSession, endSession } = useSessions();

  // Start timer function
  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setRunning(true);
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(newIntervalId);
      startSession();
      // When button is clicked, debounce, disable button for 1 second
      setIsDebounced(true);
      setTimeout(() => {
        setIsDebounced(false);
      }, 1000);
    }
  }, [isRunning, timeLeft, startSession]);

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

  // Effect to handle timer completion
  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer();
      endSession(); // End the session
      toast.success('Session completed! 🔥'); // Send a toast message
    }
    return () => {
      if (intervalId && timeLeft === 0) {
        clearInterval(intervalId);
      }
    };
  }, [timeLeft, intervalId, stopTimer, endSession]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        totalTime,
        isRunning,
        isDebounced,
        startTimer,
        stopTimer,
        resetTimer,
        updateTotalTime,
        sessions,
        streak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};