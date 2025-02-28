import Button from '../common/Button';
import { useTimer } from '../../hooks/useTimer';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const TimerControls = () => {
  const { isRunning, isDebounced, startTimer, stopTimer, resetTimer } = useTimer();

    // useRef to prevent multiple toasts
    const hasStarted = useRef(false);

  // On initial start, send a toast message
  const handleStartStop = () => {
    if (!isRunning) {
      if (!hasStarted.current) {
        toast.success('Session started!');
        hasStarted.current = true;
    }
    startTimer();
  } else {
    stopTimer();
    }
};

  return (
    <div className="controls">
      <Button
        onClick={handleStartStop}
        disabled={isDebounced}
        variant="primary"
        size="medium"
      >
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Button
        onClick={resetTimer}
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