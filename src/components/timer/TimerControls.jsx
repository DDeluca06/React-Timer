import Button from '../common/Button';
import { useTimerContext } from '../../hooks/useTimerContext';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const TimerControls = () => {
  const { isRunning, isDebounced, startTimer, stopTimer, resetTimer } = useTimerContext();

    // useRef to prevent multiple toasts
    const hasStarted = useRef(false);

  // On initial start, send a toast message
  const handleStartStop = () => {
    if (!isRunning) {
      if (!hasStarted.current) {
        toast.success('Session started!');
        hasStarted.current = true;
    }
    startTimer();
  } else {
    stopTimer();
    }
};

  return (
    <div className="controls">
      <Button
        onClick={handleStartStop}
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

export default TimerControls;

// TimerControls.jsx
// import Button from '../common/Button';
// import { useTimerContext } from '../../hooks/useTimerContext';

// const TimerControls = () => {
//   const {
//     isRunning,
//     isDebounced,
//     startTimer,
//     stopTimer,
//     resetTimer,
//     startBreak,
//     endBreak,
//   } = useTimerContext();

//   const handleStartStop = () => {
//     if (isRunning) {
//       stopTimer(); // Stop timer first
//       startBreak(); // Start break when timer stops
//     } else {
//       endBreak(); // End break when timer resumes
//       startTimer();
//     }
//   };

//   return (
//     <div className="controls">
//       <Button
//         onClick={handleStartStop}
//         disabled={isDebounced}
//         variant="primary"
//         size="medium"
//       >
//         {isRunning ? 'Stop' : 'Start'}
//       </Button>
//       <Button
//         onClick={resetTimer}
//         disabled={isDebounced}
//         variant="primary"
//         size="medium"
//       >
//         Reset
//       </Button>
//     </div>
//   );
// };