import PropTypes from 'prop-types'; // Validate prop types in our component
import Button from '../common/Button';

// Load our props into this function, return button to trigger each action
const TimerButtons = ({ isRunning, startTimer, stopTimer, resetTimer, isDebounced }) => {
  

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

// Prop definitions
TimerButtons.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  isDebounced: PropTypes.bool.isRequired,
};

export default TimerButtons;