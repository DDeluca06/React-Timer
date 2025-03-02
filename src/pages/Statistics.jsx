import { useContext } from 'react';
import { TimerContext } from '../components/context/TimerContext';
import NavBar from '../components/ui/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Stats() {
  const { sessions, streak, breaks } = useContext(TimerContext);

  // Calculate break frequency
  const breakFrequency = breaks.length;

  return (
    <div className="page-container">
      <NavBar />
      <h1>Statistics</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Current Streak</h2>
          <p>{streak} days</p>
        </div>
        <div className="stat-card">
          <h2>Break Frequency</h2>
          <p>{breakFrequency} breaks</p>
        </div>
        <div className="stat-card">
          <h2>Total Sessions</h2>
          <p>{sessions.length}</p>
        </div>
        <div className="stat-card">
          <h2>Total Break Time</h2>
          <p>
            {breaks.reduce((total, br) => total + (br.duration || 0), 0)} seconds
          </p>
        </div>
      </div>
      <div className="session-history">
        <h2>Session History</h2>
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <p>Session ID: {session.id}</p>
              <p>Duration: {session.duration} seconds</p>
              <p>Date: {new Date(session.startTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Stats;