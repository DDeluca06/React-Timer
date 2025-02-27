import './App.css';
import TimerDisplay from './components/timer/TimerDisplay';
import TimerControls from './components/timer/TimerControls';
import LinearDeterminate from './components/ui/Progress';
import { TimerProvider } from './components/context/TimerContext.jsx';

function App() {
  return (
    <TimerProvider>
      <div className="app">
        <h1>Pomodoro Timer</h1>
        <TimerDisplay />
        <TimerControls />
      </div>
      <div className="progress">
        <LinearDeterminate />
      </div>
    </TimerProvider>
  );
}

export default App;