import Button from '../common/Button';
import { useTimer } from '../../hooks/useTimer';

const TimerControls = () => {
  const { isRunning, isDebounced, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div className="controls">
      <Button
        onClick={isRunning ? stopTimer : startTimer}
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