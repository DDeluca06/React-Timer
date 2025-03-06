import { useState, useCallback, useEffect } from 'react';

const saveBreaks = (breaks) => {
  localStorage.setItem('breaks', JSON.stringify(breaks));
};

const getBreaks = () => {
  const breaks = localStorage.getItem('breaks');
  return breaks ? JSON.parse(breaks) : [];
};

export const useBreaks = () => {
  const [breaks, setBreaks] = useState(getBreaks());

  // Save breaks to localStorage on changes
  useEffect(() => saveBreaks(breaks), [breaks]);

  const startBreak = useCallback(() => {
    console.log("Starting break...");
    const newBreak = {
      id: Date.now().toString(),
      startTime: Date.now(),
      endTime: null, // Initially null until break ends
      duration: 0,
    };
    setBreaks((prev) => [...prev, newBreak]);
  }, []);

  const endBreak = useCallback(() => {
    setBreaks((prev) => {
      const lastBreak = prev[prev.length - 1];
      // Update the last break's endTime and duration
      if (lastBreak?.endTime === null) {
        const updatedBreak = {
          ...lastBreak,
          endTime: Date.now(),
          duration: Math.floor((Date.now() - lastBreak.startTime) / 1000),
        };
        return [...prev.slice(0, -1), updatedBreak];
      }
      return prev;
    });
  }, []);

  return { breaks, startBreak, endBreak };
};