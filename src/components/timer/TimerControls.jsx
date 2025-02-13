import PropTypes from 'prop-types'; // Validate prop types in our component

// Load our props into this function, return button to trigger each action
const TimerButtons = ({ isRunning, timeLeft, startTimer }) => {
  return (
    <div className="controls">
      <button 
        onClick={startTimer} 
        disabled={isRunning || timeLeft === 0}
      >
        Start Focus Session
      </button>
    </div>
  );
};

// Prop definitions
TimerButtons.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
};

export default TimerButtons;