export const saveAchievements = (achievements) => {
    const stripped = achievements.map(({ id, unlocked }) => ({ id, unlocked }));
    localStorage.setItem("achievements", JSON.stringify(stripped));
  };
  
  export const loadAchievements = () => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : null;
  };

  export const saveSettings = (settings) => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  export const loadSettings = () => {
    const saved = localStorage.getItem("settings")
    return saved ? JSON.parse(saved) : {
        theme: "dark",
        soundEnabled: true,
        notificationsEnabled: true,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        allowSkipBreaks: true,
        strictMode: false,
        longBreakInterval: 4,
        timerPresets: { pomodoro: 1500, shortBreak: 300, longBreak: 900 }
    };
  };