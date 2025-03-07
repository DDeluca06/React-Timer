import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const PomodoroProgress = () => {
  const { completedPomodoros, settings, timerMode } = useContext(TimerContext);
  
  // Calculate how many pomodoros until the next long break
  const longBreakInterval = settings.longBreakInterval || 4;
  const currentPosition = completedPomodoros % longBreakInterval;
  const pomodorosUntilLongBreak = currentPosition === 0 ? 0 : longBreakInterval - currentPosition;
  
  // Calculate the current cycle (set of pomodoros + breaks)
  const currentCycle = Math.floor(completedPomodoros / longBreakInterval) + 1;
  
  return (
    <div className="pomodoro-progress mt-6 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <div className="text-center mb-3">
        <h3 className="text-lg font-medium">Pomodoro Progress</h3>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {timerMode === 'pomodoro' ? (
            <>
              {pomodorosUntilLongBreak === 0 
                ? <span className="text-green-600 dark:text-green-400 font-medium">Long break next!</span> 
                : `${pomodorosUntilLongBreak} pomodoro${pomodorosUntilLongBreak !== 1 ? 's' : ''} until long break`}
            </>
          ) : (
            <>
              <span className={`font-medium ${timerMode === 'shortBreak' ? 'text-blue-500' : 'text-purple-500'}`}>
                {timerMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-center items-center space-x-1 mb-3">
        {Array.from({ length: longBreakInterval }).map((_, index) => {
          // Calculate if this dot represents a completed pomodoro
          const isCompleted = (completedPomodoros % longBreakInterval) > index || 
                             (completedPomodoros % longBreakInterval === 0 && completedPomodoros > 0);
          
          // Calculate if this dot represents the current pomodoro
          const isCurrent = timerMode === 'pomodoro' && 
                           ((completedPomodoros % longBreakInterval) === index);
          
          return (
            <div 
              key={index}
              className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-500 scale-100' 
                  : isCurrent 
                    ? 'bg-blue-500 scale-110 animate-pulse' 
                    : 'bg-gray-300 dark:bg-gray-600 scale-90'
              }`}
              title={`Pomodoro ${index + 1} of ${longBreakInterval}`}
            >
              {isCompleted && (
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
        <div>Cycle {currentCycle}</div>
        <div>Total: {completedPomodoros} pomodoro{completedPomodoros !== 1 ? 's' : ''}</div>
      </div>
    </div>
  );
};

export default PomodoroProgress; 