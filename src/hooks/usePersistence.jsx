// src/hooks/usePersistence.js
import { useEffect } from 'react';

export const usePersistence = (key, value, defaultValue) => {
  // Load initial state from localStorage
  const loadState = () => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  };

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return loadState();
};