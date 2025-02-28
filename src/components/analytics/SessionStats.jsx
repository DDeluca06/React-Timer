const SessionStats = ({ sessions }) => {
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);

    return (
        <div>
            <h2>Session Stats</h2>
            <p>Total Sessions: {totalSessions}</p>
            <p>Total Duration: {totalDuration} minutes</p>
        </div>
    );
};

export default SessionStats;