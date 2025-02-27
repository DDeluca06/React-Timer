import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/time';

const TimerDisplay = () => {
  const { timeLeft } = useTimer();

  return (
    <div className="display">
      <h1>{formatTime(timeLeft)}</h1>
    </div>
  );
};

export default TimerDisplay;