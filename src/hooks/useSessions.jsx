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
export const useSessions = () => {
    const [sessions, setSessions] = useState(getSessions());
    const [streak, setStreak] = useState(calculateStreak(sessions));
    const [isSessionActive, setIsSessionActive] = useState(false);

    // Update the streak when the sessions change
    useEffect(() => {
        setStreak(calculateStreak(sessions));
    }, [sessions]);

    // Start a new session
    const startSession = () => {
        console.log("Starting session...");
        const newSession = {
          id: Date.now().toString(),
          startTime: Date.now(),
          endTime: null,
          duration: 0,
        };
      
        // Set session active
        setIsSessionActive(true);
        Cookies.set('currentSession', JSON.stringify(newSession), { expires: 1 }); // Expires in 1 day
      };

    // End our session
    const endSession = () => {
        const currentSessionCookie = Cookies.get('currentSession');
        if (!currentSessionCookie) {
          console.error("No active session found.");
          return;
        }
      
        try {
          const currentSession = JSON.parse(currentSessionCookie);
          if (!currentSession || !currentSession.startTime) {
            console.error("Invalid session data.");
            return;
          }
      
          const updatedSession = {
            ...currentSession,
            endTime: Date.now(),
            duration: Math.floor((Date.now() - currentSession.startTime) / 1000), // Duration in seconds
            completed: true  // Mark the session as completed
          };
      
          // Update sessions
          const updatedSessions = [...sessions, updatedSession];
          setSessions(updatedSessions);
          saveSessions(updatedSessions);
          Cookies.remove('currentSession');
          setIsSessionActive(false);

          console.log("Session ended:", updatedSession);
        } catch (error) {
          console.error("Failed to parse session data:", error);
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