// src/components/context/TimerContext.jsx
import { createContext, useEffect } from 'react';
import { useTimerLogic } from '../../hooks/useTimerLogic';
import { useBreaks } from '../../hooks/useBreaks';
import useSessions from '../../hooks/useSessions';
import { toast } from 'react-toastify';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const {
    timeLeft,
    totalTime,
    isRunning,
    isDebounced,
    startTimer,
    stopTimer,
    resetTimer,
    updateTotalTime,
    intervalId,
    setTimeLeft, // Add setTimeLeft to the destructured values
  } = useTimerLogic();

  const { breaks, startBreak, endBreak } = useBreaks(); // Add startBreak and endBreak
  const { sessions, streak, startSession, endSession } = useSessions();

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
        breaks,
        startBreak,
        endBreak,
        setTimeLeft,
        startSession,
        endSession,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};