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

// Prop definitions, these are here to ensure that the props are passed in correctly
// This is a good practice to ensure that the component is used correctly and we drop any unexpected datatypes.
TimerButtons.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  isDebounced: PropTypes.bool.isRequired,
};

export default TimerButtons;