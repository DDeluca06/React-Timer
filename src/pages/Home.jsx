import TimerDisplay from '../components/timer/TimerDisplay';
import TimerControls from '../components/timer/TimerControls';
import TimerModeSelector from '../components/timer/TimerModeSelector';
import LinearDeterminate from '../components/ui/Progress';
import Navbar from '../components/ui/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div className="app">
        <h1>Pomodoro Timer</h1>
        <TimerModeSelector />
        <TimerDisplay />
        <TimerControls />
      </div>
      <div className="progress">
        <LinearDeterminate />
      </div>
    </>
  );
}

export default Home;