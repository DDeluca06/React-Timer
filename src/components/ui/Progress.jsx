import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useContext, useMemo, useEffect, useState, useRef } from 'react';
import { TimerContext } from '../../context/TimerContext';

function LinearDeterminate() {
  const { timeLeft, totalTime, timerMode, isRunning } = useContext(TimerContext);
  const [displayProgress, setDisplayProgress] = useState(0);
  const prevModeRef = useRef(timerMode);
  const prevTotalTimeRef = useRef(totalTime);

  // Calculate raw progress based on timeLeft and totalTime
  const rawProgress = useMemo(() => {
    // Make sure we don't divide by zero.
    if (totalTime === 0) return 0;
    
    // Calculate the percentage of time elapsed
    return Math.min(100, Math.max(0, ((totalTime - timeLeft) / totalTime) * 100));
  }, [timeLeft, totalTime]);

  // Handle mode changes and progress updates
  useEffect(() => {
    // If mode changed or total time changed significantly, reset progress
    if (prevModeRef.current !== timerMode || 
        Math.abs(prevTotalTimeRef.current - totalTime) > 5) {
      setDisplayProgress(0);
      prevModeRef.current = timerMode;
      prevTotalTimeRef.current = totalTime;
      return;
    }

    // Update progress based on running state
    if (!isRunning) {
      // When not running, show either 0 or the current raw progress
      setDisplayProgress(timeLeft === totalTime ? 0 : rawProgress);
    } else {
      // When running, show the actual progress
      setDisplayProgress(rawProgress);
    }

    // Update refs
    prevModeRef.current = timerMode;
    prevTotalTimeRef.current = totalTime;
  }, [rawProgress, timerMode, isRunning, totalTime, timeLeft]);

  // Determine the color based on the current timer mode
  const progressColor = useMemo(() => {
    switch (timerMode) {
      case 'pomodoro':
        return 'primary'; // Blue for focus time
      case 'shortBreak':
        return 'success'; // Green for short breaks
      case 'longBreak':
        return 'secondary'; // Purple for long breaks
      default:
        return 'primary';
    }
  }, [timerMode]);

  return (
    <Box sx={{ width: '100%' }}>
      <h1>Progress: {displayProgress.toFixed(2)}%</h1>
      <LinearProgress 
        variant="determinate" 
        value={displayProgress} 
        color={progressColor}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}

export default LinearDeterminate;