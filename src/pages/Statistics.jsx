import { useContext } from 'react';
import { TimerContext } from '../components/context/TimerContext';
import NavBar from '../components/ui/Navbar';

function Stats() {
  const { sessions, streak } = useContext(TimerContext);

  return (
    <div className="page-container">
      <NavBar />
      <h1>Statistics</h1>
      <div className="stats-content">
      <h2 style={{ color: 'white' }}>Current Streak</h2>
        {sessions.length === 0 ? (
            <p style={{ color: 'white' }}>No streak here!</p>
        ) : (
            <p style={{ color: 'white' }}>Your current streak is {streak}!</p>
    )};
        <h2 style={{ color: 'white' }}>Session History</h2>
            {sessions.length === 0 ? (
            <p style={{ color: 'white' }}>No sessions yet!</p>
            ) : (
            <ul>
                {sessions.map((session) => (
                <li key={session.id}>
                    <p>Session ID: {session.id}</p>
                    <p>Duration: {session.duration} seconds</p>
                    <p>Date: {new Date(session.startTime).toLocaleString()}</p>
                </li>
                ))}
            </ul>
            )}
      </div>
    </div>
  );
}

export default Stats;