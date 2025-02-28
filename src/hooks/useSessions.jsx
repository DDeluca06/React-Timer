import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { differenceInDays, isToday, isYesterday } from 'date-fns';

// Saving our session into localStorage
const saveSessions = (sessions) => {
  localStorage.setItem('sessions', JSON.stringify(sessions));
};

// Getting our session from localStorage
const getSessions = () => {
  const sessions = localStorage.getItem('sessions');
  return sessions ? JSON.parse(sessions) : [];
}

// Calculate the streak we have based on what we have in our sessions
const calculateStreak = (sessions) => {
    if (sessions.length === 0) return 0;

    let streak = 0;
    let previousDate = null;

    const sortedSessions = sessions
        .map((session) => new Date(session.endTime))
        .sort((a, b) => a - b);
    
    for (const sessionDate of sortedSessions) {
        // Initialize streak if there is no previous date
        if (!previousDate) {
            streak = 1;
        // If the current session is from the same day as the previous one, increment the streak
        } else if (differenceInDays(sessionDate, previousDate) === 1) {
            streak += 1;
        // Reset the streak if a day is missed
        } else if (!isToday(sessionDate) && !isYesterday(sessionDate)) {
            streak = 0;
        }
    previousDate = sessionDate;
}
return streak;
};

// Custom hook to manage our sessions
const useSessions = () => {
    const [sessions, setSessions] = useState(getSessions());
    const [streak, setStreak] = useState(calculateStreak(sessions));
    const [isSessionActive, setIsSessionActive] = useState(false);

    // Update the streak when the sessions change
    useEffect(() => {
        setStreak(calculateStreak(sessions));
    }, [sessions]);

    // Start a new session
    const startSession = () => {
        const newSession = {
            id: Date.now().toString(),
            startTime: Date.now(),
            endTime: null,
            duration: 0,
        };
        // Set session active
        setIsSessionActive(true);
        Cookies.set('currentSession', JSON.stringify(newSession));
    };

    // End our current session
    const endSession = () => {
        const currentSession = JSON.parse(Cookies.get('currentSession'));
        if (currentSession) {
            const updatedSession = {
                ...currentSession,
                endTime: Date.now(),
                duration: Math.floor((Date.now() - currentSession.startTime) / 1000), // Duration in seconds
            };
        // Update sessions
        const updatedSessions = [...sessions, updatedSession];
        setSessions(updatedSessions);
        saveSessions(updatedSessions);
        Cookies.remove('currentSession');
        setIsSessionActive(false);
    }
};

return {
    sessions,
    streak,
    isSessionActive,
    startSession,
    endSession,
    };
};

export default useSessions;