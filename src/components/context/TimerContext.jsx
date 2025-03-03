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
    setTimeLeft,
  } = useTimerLogic();

  // Custom hooks for breaks and sessions
  const { breaks, startBreak, endBreak } = useBreaks();
  const { sessions, streak, startSession, endSession } = useSessions();

  // Effect to handle timer completion
  useEffect(() => {
    // If timeLeft reaches 0, stop the timer and start a break
    if (timeLeft === 0) {
      stopTimer();
      endSession();
      startBreak(); 
      toast.success('Session completed! Take a break! ☕');
    }
    return () => {
      if (intervalId && timeLeft === 0) {
        clearInterval(intervalId);
      }
    };
  }, [timeLeft, intervalId, stopTimer, endSession, startBreak]);

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