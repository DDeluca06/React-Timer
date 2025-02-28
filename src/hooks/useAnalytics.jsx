import useSessions from "./useSessions";

const useAnalytics = () => {
    const { sessions, streak, isSessionActive, startSession, endSession } = useSessions();

    return {
        sessions,
        streak,
        isSessionActive,
        startSession,
        endSession
        };
};

export default useAnalytics;