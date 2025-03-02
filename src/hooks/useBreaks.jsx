// src/hooks/useBreaks.js
import { useState, useCallback } from 'react';

export const useBreaks = () => {
  const [breaks, setBreaks] = useState([]);

  // Start a break
  const startBreak = useCallback(() => {
    const newBreak = {
      id: Date.now().toString(),
      startTime: Date.now(),
      endTime: null,
      duration: 0,
    };
    setBreaks((prevBreaks) => [...prevBreaks, newBreak]);
  }, []); // No dependencies, so the function is memoized and stable

  // End a break
  const endBreak = useCallback(() => {
    setBreaks((prevBreaks) => {
      const lastBreak = prevBreaks[prevBreaks.length - 1];
      if (lastBreak && !lastBreak.endTime) {
        const updatedBreak = {
          ...lastBreak,
          endTime: Date.now(),
          duration: Math.floor((Date.now() - lastBreak.startTime) / 1000), // Duration in seconds
        };
        return [...prevBreaks.slice(0, -1), updatedBreak];
      }
      return prevBreaks;
    });
  }, []); // No dependencies, so the function is memoized and stable

  return {
    breaks,
    startBreak,
    endBreak,
  };
};