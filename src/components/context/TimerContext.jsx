import { createContext, useEffect, useState } from "react";
import { useTimerLogic } from "../../hooks/useTimerLogic";
import { useBreaks } from "../../hooks/useBreaks";
import { useSessions } from "../../hooks/useSessions";
import { toast } from "react-toastify";
import { getAchievements, checkAchievements } from "../../utils/achievements";
import { saveAchievements, loadAchievements, saveSettings, loadSettings } from "../../utils/storage";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { timeLeft, totalTime, isRunning, isDebounced, startTimer, stopTimer, resetTimer, updateTotalTime, intervalId, setTimeLeft } = useTimerLogic();

  // Custom hooks for breaks and sessions
  const { breaks, startBreak, endBreak } = useBreaks();
  const { sessions, streak, startSession, endSession, isSessionActive } = useSessions();

  // Loading achievements from localStorage or setting them to default
  const [achievements, setAchievements] = useState(() => {
    const saved = loadAchievements(); // Only contains { id, unlocked }
    return getAchievements(saved); // Merge with fresh data (including conditions)
  });

  // Settings
  const [settings, setSettings] = useState(() => loadSettings() || {
    theme: "dark",
    soundEnabled: true,
    notificationsEnabled: true, 
    timerPresets: {
      pomodoro: 1500,
      shortBreak: 300,
      longBreak: 900
    }
  })

  // Update settings when changed
  const updateSettings = (newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  };

  // Timer Complection
  useEffect(() => {
    if (timeLeft === 0) {
        console.log("Timer reached 0. Ending session and starting break...");

        stopTimer();
        endSession();
        startBreak();

        // Check achievements after a session is completed
        const updatedAchievements = checkAchievements(achievements, sessions.length, streak);
        if (JSON.stringify(updatedAchievements) !== JSON.stringify(achievements)) {
          setAchievements(updatedAchievements);
          saveAchievements(updatedAchievements);
        }

        toast.success("Session completed! Take a break! ☕");

        setTimeLeft(totalTime); // Reset the timer
        // Delay the reset to ensure session and break logic completes
        setTimeout(() => {
          resetTimer(); // Reset the timer after a short delay
        }, 100); // 100ms delay
    }
  }, [timeLeft, intervalId, stopTimer, endSession, startBreak, resetTimer, isSessionActive, sessions.length, streak, achievements]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        totalTime,
        isRunning,
        isDebounced,
        startTimer,
        stopTimer,
        resetTimer,
        updateTotalTime,
        sessions,
        streak,
        breaks,
        startBreak,
        endBreak,
        setTimeLeft,
        startSession,
        endSession,
        achievements,
        isSessionActive,
        settings,
        updateSettings
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};