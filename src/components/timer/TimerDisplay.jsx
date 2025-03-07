import { useContext, useEffect, useState } from 'react';
import { formatTime } from '../../hooks/useTime';
import { TimerContext } from '../context/TimerContext';

const TimerDisplay = () => {
  const { timeLeft, timerMode } = useContext(TimerContext);
  const [displayTime, setDisplayTime] = useState(timeLeft);
  const formattedTime = formatTime(displayTime);

  // Update display time whenever timeLeft or timerMode changes
  useEffect(() => {
    setDisplayTime(timeLeft);
  }, [timeLeft, timerMode]);

  // Get a user-friendly name for the current mode
  const getModeLabel = () => {
    switch(timerMode) {
      case 'pomodoro':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Timer';
    }
  };

  return (
    <div className="display">
      <div className="mode-indicator mb-2 text-sm font-medium text-gray-500">
        {getModeLabel()} 
      </div>
      {/* Display formatted time... */}
      {/* This animation really, really sucks. I don't think it fits, and splitting the numbers apart so we change per number is a lot, a **lot** of work. But the requirements call out for it, and thus, I have presented it to you. Try not to get too sick. */}
      <h1 key={formattedTime} className="number-drop">
        {formattedTime}
      </h1>
    </div>
  );
};

export default TimerDisplay;