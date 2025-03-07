import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { showToast } from '../../utils/Notifications';

const BreakActions = () => {
  const { 
    timerMode, 
    switchTimerMode, 
    settings, 
    isRunning,
    stopTimer,
    endBreak,
    startTimer
  } = useContext(TimerContext);

  // Only show for break modes
  if (timerMode !== 'shortBreak' && timerMode !== 'longBreak') {
    return null;
  }

  // Don't show if skipping breaks is not allowed
  if (!settings.allowSkipBreaks) {
    return null;
  }

  const handleSkipBreak = () => {
    // Stop the current break timer if it's running
    if (isRunning) {
      stopTimer();
    }

    // End the break
    endBreak();

    // Switch to pomodoro mode
    switchTimerMode('pomodoro');

    // Show toast notification
    showToast.info('Break skipped. Ready to focus!');

    // Auto-start pomodoro if enabled
    if (settings.autoStartPomodoros) {
      startTimer();
    }
  };

  return (
    <div className="break-actions mt-4">
      <button
        onClick={handleSkipBreak}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      >
        Skip Break
      </button>
    </div>
  );
};

export default BreakActions; 