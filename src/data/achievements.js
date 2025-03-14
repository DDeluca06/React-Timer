export const achievementsData = [
  {
    id: 1,
    name: "First Timer",
    description: "Complete your first Pomodoro session.",
    category: "Getting Started",
    condition: (completedSessions) => completedSessions >= 1,
    unlocked: false,
  },
  {
    id: 2,
    name: "Streak Starter",
    description: "Complete 3 Pomodoro sessions in a row.",
    category: "Consistency",
    condition: (completedSessions, currentStreak) => currentStreak >= 3,
    unlocked: false,
  },
  {
    id: 3,
    name: "Focus Master",
    description: "Complete 10 Pomodoro sessions.",
    category: "Milestones",
    condition: (completedSessions) => completedSessions >= 10,
    unlocked: false,
  },
  {
    id: 4,
    name: "Iron Will",
    description: "Maintain a 7-day streak of Pomodoro sessions.",
    category: "Consistency",
    condition: (completedSessions, currentStreak) => currentStreak >= 7,
    unlocked: false,
  },
  {
    id: 5,
    name: "Early Bird",
    description: "Complete a Pomodoro session before 9 AM.",
    category: "Time Management",
    condition: (completedSessions, currentStreak, lastSessionTime) => {
      if (!lastSessionTime) return false;
      const sessionHour = new Date(lastSessionTime).getHours();
      return sessionHour < 9;
    },
    unlocked: false,
  },
  {
    id: 6,
    name: "Marathon Runner",
    description: "Complete 5 Pomodoro sessions in a single day.",
    category: "Productivity",
    condition: (completedSessions, currentStreak, lastSessionTime, dailySessions) => dailySessions >= 5,
    unlocked: false,
  },
  {
    id: 7,
    name: "Break Time Champion",
    description: "Take all your scheduled breaks for 5 consecutive sessions.",
    category: "Wellness",
    condition: (completedSessions, currentStreak, lastSessionTime, breakCompliance) => breakCompliance >= 5,
    unlocked: false,
  },
  {
    id: 8,
    name: "Century Club",
    description: "Complete 100 Pomodoro sessions.",
    category: "Milestones",
    condition: (completedSessions) => completedSessions >= 100,
    unlocked: false,
  },
  {
    id: 9,
    name: "Night Owl",
    description: "Complete a Pomodoro session after 10 PM.",
    category: "Time Management",
    condition: (completedSessions, currentStreak, lastSessionTime) => {
      if (!lastSessionTime) return false;
      const sessionHour = new Date(lastSessionTime).getHours();
      return sessionHour >= 22;
    },
    unlocked: false,
  },
  {
    id: 10,
    name: "Weekend Warrior",
    description: "Complete a Pomodoro session on a weekend.",
    category: "Time Management",
    condition: (completedSessions, currentStreak, lastSessionTime) => {
      if (!lastSessionTime) return false;
      const sessionDay = new Date(lastSessionTime).getDay();
      return sessionDay === 0 || sessionDay === 6; // 0 is Sunday, 6 is Saturday
    },
    unlocked: false,
  },
  {
    id: 11,
    name: "Perfect Week",
    description: "Complete at least one Pomodoro session every day for a week.",
    category: "Consistency",
    condition: (completedSessions, currentStreak, lastSessionTime, weeklyCompliance) => weeklyCompliance >= 7,
    unlocked: false,
  },
  {
    id: 12,
    name: "Morning Person",
    description: "Complete 5 Pomodoro sessions before noon.",
    category: "Time Management",
    condition: (completedSessions, currentStreak, lastSessionTime, morningSessions) => morningSessions >= 5,
    unlocked: false,
  },
  {
    id: 13,
    name: "Focus Legend",
    description: "Complete 500 Pomodoro sessions.",
    category: "Milestones",
    condition: (completedSessions) => completedSessions >= 500,
    unlocked: false,
  },
  {
    id: 14,
    name: "Break Master",
    description: "Take all scheduled breaks for 10 consecutive sessions.",
    category: "Wellness",
    condition: (completedSessions, currentStreak, lastSessionTime, breakCompliance) => breakCompliance >= 10,
    unlocked: false,
  },
  {
    id: 15,
    name: "Productivity Pro",
    description: "Complete 8 Pomodoro sessions in a single day.",
    category: "Productivity",
    condition: (completedSessions, currentStreak, lastSessionTime, dailySessions) => dailySessions >= 8,
    unlocked: false,
  },
  {
    id: 16,
    name: "Long Haul",
    description: "Maintain a 30-day streak of Pomodoro sessions.",
    category: "Consistency",
    condition: (completedSessions, currentStreak) => currentStreak >= 30,
    unlocked: false,
  },
  {
    id: 17,
    name: "Focus Master Elite",
    description: "Complete 1000 Pomodoro sessions.",
    category: "Milestones",
    condition: (completedSessions) => completedSessions >= 1000,
    unlocked: false,
  },
  {
    id: 18,
    name: "Break Time Expert",
    description: "Take all scheduled breaks for 20 consecutive sessions.",
    category: "Wellness",
    condition: (completedSessions, currentStreak, lastSessionTime, breakCompliance) => breakCompliance >= 20,
    unlocked: false,
  },
  {
    id: 19,
    name: "Productivity Legend",
    description: "Complete 12 Pomodoro sessions in a single day.",
    category: "Productivity",
    condition: (completedSessions, currentStreak, lastSessionTime, dailySessions) => dailySessions >= 12,
    unlocked: false,
  },
  {
    id: 20,
    name: "Time Management Guru",
    description: "Complete Pomodoro sessions at 3 different times of day (morning, afternoon, evening).",
    category: "Time Management",
    condition: (completedSessions, currentStreak, lastSessionTime, timeOfDayVariety) => timeOfDayVariety >= 3,
    unlocked: false,
  }
];