import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Timer from "./components/timer/TimerDisplay";
import TimerButtons from "./components/timer/TimerControls";

function App() {
  // State for managing timer
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setRunning] = useState(false);
  const [isDebounced, setIsDebounced] = useState(false); // Debounce state, prevents multiple clicks
  const [intervalId, setIntervalId] = useState(null);

  // Start timer function
  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setRunning(true);
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(newIntervalId);
      // When button is clicked, debounce, disable button
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

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(1500);
    setIsDebounced(true);
    setTimeout(() => {
      setIsDebounced(false);
    }, 1000);
  };

  // Effect to handle timer completion
  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer();
    }
    return () => {
      if (intervalId && timeLeft === 0) {
        clearInterval(intervalId);
      }
    };
  }, [timeLeft, intervalId, stopTimer]);

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <Timer timeLeft={timeLeft} />
      <TimerButtons isRunning={isRunning} timeLeft={timeLeft} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} isDebounced={isDebounced} />
    </div>
  );
}

export default App;
