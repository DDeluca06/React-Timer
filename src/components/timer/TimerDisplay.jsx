import PropTypes from 'prop-types';

const Timer = ({ timeLeft }) => {
  // Formatting the time for displaying seconds to minutes
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="display">
      <h1>{formatTime(timeLeft)}</h1>
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};

export default Timer;