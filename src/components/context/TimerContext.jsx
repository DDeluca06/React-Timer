import { createContext, useEffect, useState, useCallback } from "react";
import { useTimerLogic } from "../../hooks/useTimerLogic";
import { useBreaks } from "../../hooks/useBreaks";
import { useSessions } from "../../hooks/useSessions";
import { getAchievements, checkAchievements } from "../../utils/Achievements";
import { saveAchievements, loadAchievements, saveSettings, loadSettings } from "../../utils/Storage";
import { showToast } from "../../utils/Notifications";
import PropTypes from "prop-types";

export const TimerContext = createContext();

// Helper function to save timer mode to localStorage
const saveTimerMode = (mode) => {
  localStorage.setItem("timerMode", mode);
};

// Helper function to load timer mode from localStorage
const loadTimerMode = () => {
  return localStorage.getItem("timerMode") || "pomodoro";
};

export const TimerProvider = ({ children }) => {
  const {
    timeLeft,
    totalTime,
    isRunning,
    isDebounced,
    startTimer,
    stopTimer,
    resetTimer,
    updateTotalTime,
    setTimeLeft
  } = useTimerLogic();

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
      pomodoro: 1500, // 25 minutes in seconds
      shortBreak: 300, // 5 minutes in seconds
      longBreak: 900   // 15 minutes in seconds
    }
  });

  // Track the current timer mode and completed pomodoros
  // Load timer mode from localStorage or default to 'pomodoro'
  const [timerMode, setTimerMode] = useState(() => loadTimerMode());
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // Update settings when changed
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);

      // If timer presets were updated, update the current timer
      if (newSettings.timerPresets) {
        // Force update the timer with the new presets
        const currentMode = timerMode;
        const newDuration = newSettings.timerPresets[currentMode] || updated.timerPresets[currentMode];

        console.log(`Updating timer for ${currentMode} with new duration: ${newDuration} seconds`);
        updateTotalTime(newDuration);

        // If not running, reset the timer to show the new time
        if (!isRunning) {
          setTimeLeft(newDuration);
        }
      }

      return updated;
    });
  }, [timerMode, updateTotalTime, isRunning, setTimeLeft]);

  // Function to update the timer based on the current mode
  const updateTimerBasedOnMode = useCallback((mode = timerMode, presets = settings.timerPresets) => {
    // Ensure we're using the correct mode's duration
    const duration = presets[mode];
    if (duration) {
      console.log(`Setting timer for ${mode} mode: ${duration} seconds`);
      updateTotalTime(duration);
      setTimeLeft(duration); // Directly update timeLeft to ensure display updates
    } else {
      console.error(`Invalid timer mode: ${mode}`);
    }
  }, [timerMode, settings.timerPresets, updateTotalTime, setTimeLeft]);

  // Function to switch between timer modes
  const switchTimerMode = useCallback((mode) => {
    console.log(`Switching to ${mode} mode`);

    // Stop the timer first to prevent any race conditions
    if (isRunning) {
      stopTimer();
    }

    // Update the mode and save to localStorage
    setTimerMode(mode);
    saveTimerMode(mode);

    // Update the timer with the new mode's duration
    const duration = settings.timerPresets[mode];
    if (duration) {
      console.log(`Setting timer for ${mode} mode: ${duration} seconds`);
      updateTotalTime(duration);

      // Only reset timeLeft if we're not currently running
      // This ensures we don't reset when pausing and switching modes
      setTimeLeft(duration);
    }
  }, [isRunning, stopTimer, settings.timerPresets, updateTotalTime, setTimeLeft]);

  // Timer Completion
  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      if (timerMode === 'pomodoro') {
        // End the work session
        endSession();

        // Increment completed pomodoros
        const newCompletedPomodoros = completedPomodoros + 1;
        setCompletedPomodoros(newCompletedPomodoros);

        // Determine which break to take (short or long)
        const nextMode = (newCompletedPomodoros % 4 === 0) ? 'longBreak' : 'shortBreak';

        // Set the timer mode and save to localStorage
        setTimerMode(nextMode);
        saveTimerMode(nextMode);

        // Update the timer with the correct duration for the new mode
        const duration = settings.timerPresets[nextMode];
        updateTotalTime(duration);
        setTimeLeft(duration);

        // Start the break
        startBreak();

        // Check achievements after a session is completed
        const updatedAchievements = checkAchievements(achievements, sessions.length, streak);
        if (JSON.stringify(updatedAchievements) !== JSON.stringify(achievements)) {
          setAchievements(updatedAchievements);
          saveAchievements(updatedAchievements);
        }

        showToast.success("Pomodoro completed! Take a break! ☕");
      } else {
        // End the break
        endBreak();

        // Switch back to pomodoro mode and save to localStorage
        setTimerMode('pomodoro');
        saveTimerMode('pomodoro');

        // Update the timer with the pomodoro duration
        const duration = settings.timerPresets['pomodoro'];
        updateTotalTime(duration);
        setTimeLeft(duration);

        // Prepare for the next work session
        showToast.info("Break finished! Ready to focus again? 🚀");
      }
    }
  }, [timeLeft, isRunning, timerMode, stopTimer, endSession, startBreak, endBreak,
    settings.timerPresets, updateTotalTime, setTimeLeft, completedPomodoros,
    achievements, sessions.length, streak]);

  // Initialize timer based on mode when component mounts or when settings change
  useEffect(() => {
    // Get the current mode from state
    const currentMode = timerMode;

    // Get the duration for the current mode
    const duration = settings.timerPresets[currentMode];

    if (duration) {
      console.log(`Initializing timer for ${currentMode} mode: ${duration} seconds`);
      updateTotalTime(duration);

      // Only reset timeLeft if the timer is not running
      if (!isRunning) {
        setTimeLeft(duration);
      }
    }
  }, [settings.timerPresets, timerMode, updateTotalTime, setTimeLeft, isRunning]);

  // Save timer mode to localStorage whenever it changes
  useEffect(() => {
    saveTimerMode(timerMode);
  }, [timerMode]);

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
        updateSettings,
        timerMode,
        switchTimerMode,
        completedPomodoros,
        updateTimerBasedOnMode
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Add prop validation
TimerProvider.propTypes = {
  children: PropTypes.node.isRequired
};