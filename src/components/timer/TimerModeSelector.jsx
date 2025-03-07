import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import PropTypes from 'prop-types';

const TimerModeSelector = () => {
  const { timerMode, switchTimerMode, isRunning } = useContext(TimerContext);

  const handleModeChange = (mode) => {
    // If the timer is running, we need the user to confirm the change
    if (isRunning) {
      if (!confirm('Changing the timer mode will reset the current timer. Continue?')) {
        return;
      }
    }
    switchTimerMode(mode);
  };

  return (
    <div className="flex justify-center space-x-2 mb-4">
      <ModeButton 
        mode="pomodoro" 
        currentMode={timerMode} 
        onClick={() => handleModeChange('pomodoro')}
      >
        Pomodoro
      </ModeButton>
      <ModeButton 
        mode="shortBreak" 
        currentMode={timerMode} 
        onClick={() => handleModeChange('shortBreak')}
      >
        Short Break
      </ModeButton>
      <ModeButton 
        mode="longBreak" 
        currentMode={timerMode} 
        onClick={() => handleModeChange('longBreak')}
      >
        Long Break
      </ModeButton>
    </div>
  );
};

const ModeButton = ({ mode, currentMode, onClick, children }) => {
  const isActive = mode === currentMode;
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {children}
    </button>
  );
};

// Prop types for the ModeButton component; ESLint is a pain. Please, make it go away.
// We don't *technically* need these, since we're not using TypeScript. 
ModeButton.propTypes = {
  mode: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default TimerModeSelector; 