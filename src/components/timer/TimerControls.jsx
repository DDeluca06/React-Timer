import Button from '../common/Button';
import { useTimerContext } from '../../hooks/useTimerContext';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useBreaks } from '../../hooks/useBreaks';
import { useSessions } from '../../hooks/useSessions';

const TimerControls = () => {
  const { isRunning, isDebounced, startTimer, stopTimer, resetTimer } = useTimerContext();
  const {startBreak, endBreak} = useBreaks();
  const { startSession, endSession } = useSessions();

    // useRef to prevent multiple toasts
    const hasStarted = useRef(false);

  // On initial start, send a toast message
  const handleStartStop = () => {
    if (!isRunning) {
      if (!hasStarted.current) {
        toast.success('Session started!');
        hasStarted.current = true;
    }
    endBreak();
    startSession();
    startTimer();
  } else {
    stopTimer();
    endSession();
    startBreak();
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