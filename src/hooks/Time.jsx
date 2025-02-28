export const formatTime = (totalSeconds) => {
    // Calculate minutes and seconds from total seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Return formatted time
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };