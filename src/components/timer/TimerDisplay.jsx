import PropTypes from 'prop-types'; // Importing PropTypes to validate the props

const Timer = ({ timeLeft }) => {
  // Formatting the time for displaying seconds to minutes
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Displaying the time left
  return (
    <div className="display">
      <h1>Focus Session</h1>
      <h1>{formatTime(timeLeft)}</h1>
    </div>
  );
};

// Validating the props
Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};

export default Timer;