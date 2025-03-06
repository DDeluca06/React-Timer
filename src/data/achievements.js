export const achievementsData = [
  {
    id: 1,
    name: "First Timer",
    description: "Complete your first Pomodoro session.",
    condition: (completedSessions, currentStreak) => completedSessions >= 1,
    unlocked: false,
  },
  {
    id: 2,
    name: "Streak Starter",
    description: "Complete 3 Pomodoro sessions in a row.",
    condition: (completedSessions, currentStreak) => currentStreak >= 3,
    unlocked: false,
  },
];