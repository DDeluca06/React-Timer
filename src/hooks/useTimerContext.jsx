import { useContext } from 'react';
import { TimerContext } from '../components/context/TimerContext';

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};