import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/time';

const TimerDisplay = () => {
  const { timeLeft } = useTimer();
  const formattedTime = formatTime(timeLeft);

  return (
    <div className="display">
      {/* Display formatted time... */}
      {/* This animation really, really sucks. I don't think it fits, and splitting the numbers apart so we change per number is a lot, a **lot** of work. But the requirements call out for it, and thus, I have presented it to you. Try not to get too sick. */}
      <h1 key={formattedTime} className="number-drop">
        {formattedTime}
      </h1>
    </div>
  );
};

export default TimerDisplay;