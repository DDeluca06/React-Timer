import Button from '../common/Button';
import { useRef, useContext, useState, useEffect } from 'react';
import { TimerContext } from '../context/TimerContext';
import { showToast } from '../../utils/Notifications';

const TimerControls = () => {
  const { 
    isRunning, 
    isDebounced, 
    startTimer, 
    stopTimer, 
    resetTimer, 
    timerMode,
    startSession,
    endSession,
    timeLeft,
    totalTime
  } = useContext(TimerContext);
  
  const hasStarted = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Track if the timer is paused (stopped but not at full duration)
  useEffect(() => {
    // If not running and timeLeft is less than totalTime, we're paused
    setIsPaused(!isRunning && timeLeft < totalTime);
  }, [isRunning, timeLeft, totalTime]);

  // Handle start/stop button click
  const handleStartStop = () => {
    if (!isRunning) {
      // Starting or resuming the timer
      if (!hasStarted.current) {
        hasStarted.current = true;
      }
      
      // If we're in pomodoro mode, start a session
      if (timerMode === 'pomodoro') {
        startSession();
      }
      
      // Start the timer
      startTimer();
      
      // Show appropriate toast message
      if (isPaused) {
        // Resuming
        if (timerMode === 'pomodoro') {
          showToast.info('Focus time resumed');
        } else if (timerMode === 'shortBreak') {
          showToast.info('Short break resumed');
        } else if (timerMode === 'longBreak') {
          showToast.info('Long break resumed');
        }
      } else {
        // Starting fresh
        if (timerMode === 'pomodoro') {
          showToast.info('Focus time started');
        } else if (timerMode === 'shortBreak') {
          showToast.info('Short break started');
        } else if (timerMode === 'longBreak') {
          showToast.info('Long break started');
        }
      }
    } else {
      // Pausing the timer
      stopTimer();
      
      // If we're in pomodoro mode, end the session
      if (timerMode === 'pomodoro') {
        endSession();
      }
      
      // Show appropriate toast message
      if (timerMode === 'pomodoro') {
        showToast.info('Focus time paused');
      } else {
        showToast.info('Break paused');
      }
    }
  };

  // Handle reset button click
  const handleReset = () => {
    resetTimer();
    showToast.info('Timer reset');
  };

  return (
    <div className="controls">
      <Button
        onClick={handleStartStop}
        disabled={isDebounced}
        variant="primary"
        size="medium"
      >
        {isRunning ? 'Pause' : (isPaused ? 'Resume' : 'Start')}
      </Button>
      <Button
        onClick={handleReset}
        disabled={isDebounced}
        variant="primary"
        size="medium"
      >
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;