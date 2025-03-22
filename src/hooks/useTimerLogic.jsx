// src/hooks/useTimerLogic.jsx
import { useState, useCallback, useEffect, useRef } from "react";

// Helper function to save timer state to localStorage
const saveTimerState = (state) => {
  localStorage.setItem("timerState", JSON.stringify(state));
};

// Helper function to load timer state from localStorage
const loadTimerState = () => {
  try {
    const state = localStorage.getItem("timerState");
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error("Error loading timer state:", error);
    return null;
  }
};

export const useTimerLogic = () => {
  // Load saved state or use defaults
  const savedState = loadTimerState();
  
  const [timeLeft, setTimeLeft] = useState(savedState?.timeLeft || 1500); // Default: 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(savedState?.totalTime || 1500); // Default: 25 minutes in seconds
  const [isRunning, setRunning] = useState(false); // Always start paused
  const [isDebounced, setIsDebounced] = useState(false);
  const [isPaused, setIsPaused] = useState(savedState?.isPaused || false); // Create a new state for checking if the timer is paused
  
  // Use a ref to track the interval ID
  const intervalIdRef = useRef(null);
  
  // Track if we're in a paused state based on timeLeft and isRunning
  useEffect(() => {
    setIsPaused(!isRunning && timeLeft < totalTime && timeLeft > 0);
  }, [isRunning, timeLeft, totalTime]);
  
  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    // Save the current state to localStorage
    saveTimerState({ 
      timeLeft, 
      isRunning: false, 
      totalTime,
      isPaused: isPaused
    });
  }, [timeLeft, totalTime, isPaused]);

  // Start timer function
  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setRunning(true);
      // Reset the paused state
      setIsPaused(false);
      
      // Clear any existing interval
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      
      // Create a new interval
      intervalIdRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          // Stop at 0
          if (prevTime <= 1) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            setRunning(false);
            setIsPaused(false);
            return 0;
          }
          
          // Decrement the time left
          return prevTime - 1;
        });
      }, 1000);
      
      // Set debounce to prevent rapid clicking
      setIsDebounced(true);
      setTimeout(() => {
        setIsDebounced(false);
      }, 1000);
    }
  }, [isRunning, timeLeft]);

  // Stop timer function
  const stopTimer = useCallback(() => {
    // Only stop if currently running
    if (isRunning) {
      setRunning(false);
      
      // Mark as paused if we have time remaining
      if (timeLeft < totalTime && timeLeft > 0) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
      
      // Clear the interval
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      
      // Save the current state to localStorage
      saveTimerState({ 
        timeLeft, 
        isRunning: false, 
        totalTime,
        isPaused: timeLeft < totalTime && timeLeft > 0
      });
      
      // Set debounce to prevent rapid clicking
      setIsDebounced(true);
      setTimeout(() => {
        setIsDebounced(false);
      }, 1000);
    }
  }, [isRunning, timeLeft, totalTime]);

  // Reset timer function
  const resetTimer = useCallback(() => {
    // Stop the timer first
    if (isRunning) {
      setRunning(false);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }
    
    // Reset to the total time
    setTimeLeft(totalTime);
    setIsPaused(false);
    
    // Save the reset state
    saveTimerState({ 
      timeLeft: totalTime, 
      isRunning: false, 
      totalTime, 
      isPaused: false 
    });
    
    // Set debounce to prevent rapid clicking
    setIsDebounced(true);
    setTimeout(() => {
      setIsDebounced(false);
    }, 1000);
  }, [isRunning, totalTime]);

  // Updates our totalTime state
  const updateTotalTime = useCallback((newTotalTime) => {
    // Only log and update if the total time is actually changing
    if (totalTime !== newTotalTime) {
      console.log(`Updating total time to ${newTotalTime} seconds`);
      setTotalTime(newTotalTime);
      
      // If timer is not running, also update timeLeft
      if (!isRunning && !isPaused) {
        setTimeLeft(newTotalTime);
      }
    }
  }, [isRunning, isPaused, totalTime]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Clear the interval on unmount
      }
    };
  }, []);

  return {
    timeLeft,
    totalTime,
    isRunning,
    isDebounced,
    isPaused,
    startTimer,
    stopTimer,
    resetTimer,
    updateTotalTime,
    setTimeLeft,
  };
};
