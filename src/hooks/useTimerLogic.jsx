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
  
  // Use a ref to track the interval ID
  const intervalIdRef = useRef(null);
  // Use a ref to track the current time left when pausing
  const pausedTimeRef = useRef(timeLeft);
  
  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    // Save the current timeLeft, not the total time
    saveTimerState({ timeLeft, isRunning: false, totalTime });
  }, [timeLeft, totalTime]);

  // Start timer function
  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      // Use the paused time if available
      const startFrom = pausedTimeRef.current > 0 ? pausedTimeRef.current : timeLeft;
      
      // Set the current time to the paused time
      setTimeLeft(startFrom);
      
      setRunning(true);
      
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
            pausedTimeRef.current = 0; // Reset paused time
            return 0;
          }
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
      
      // Store the current time left for resuming later
      pausedTimeRef.current = timeLeft;
      
      // Clear the interval
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      
      // Save the current state to localStorage
      saveTimerState({ timeLeft, isRunning: false, totalTime });
      
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
    pausedTimeRef.current = totalTime; // Reset paused time reference
    
    // Save the reset state
    saveTimerState({ timeLeft: totalTime, isRunning: false, totalTime });
    
    // Set debounce to prevent rapid clicking
    setIsDebounced(true);
    setTimeout(() => {
      setIsDebounced(false);
    }, 1000);
  }, [isRunning, totalTime]);

  // Updates our totalTime state
  const updateTotalTime = useCallback((newTotalTime) => {
    console.log(`Updating total time to ${newTotalTime} seconds`);
    setTotalTime(newTotalTime);
    
    // If timer is not running, also update timeLeft and paused time
    if (!isRunning) {
      setTimeLeft(newTotalTime);
      pausedTimeRef.current = newTotalTime;
    }
  }, [isRunning]);

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
    startTimer,
    stopTimer,
    resetTimer,
    updateTotalTime,
    setTimeLeft,
  };
};
