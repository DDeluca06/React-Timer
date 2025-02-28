const StreakCounter = ({ streak }) => {
    return (
        <div>
            <h2>Your Streak</h2>
            <p>{streak} days!</p>
        </div>
    );
};

export default StreakCounter;