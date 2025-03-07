import TimerDisplay from '../components/timer/TimerDisplay';
import TimerControls from '../components/timer/TimerControls';
import TimerModeSelector from '../components/timer/TimerModeSelector';
import LinearDeterminate from '../components/ui/Progress';
import Navbar from '../components/ui/NavBar';
import BreakActions from '../components/timer/BreakActions';

function Home() {
  return (
    <>
      <Navbar />
      <div className="app">
        <h1>Pomodoro Timer</h1>
        <TimerModeSelector />
        <TimerDisplay />
        <TimerControls />
        <BreakActions />
      </div>
      <div className="progress">
        <LinearDeterminate />
      </div>
    </>
  );
}

export default Home;