import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useTimerContext } from '../../hooks/useTimerContext';

function LinearDeterminate() {
  const { timeLeft, totalTime } = useTimerContext();

  // Calculate progress based on timeLeft and totalTime
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <Box sx={{ width: '100%' }}>
      <h1>Progress: {progress.toFixed(2)}%</h1>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

export default LinearDeterminate;