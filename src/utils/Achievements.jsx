import { showToast } from "./Notifications.jsx";
import { achievementsData } from "../data/achievements.js";
import { format, getHours, isSameDay } from 'date-fns';

export const getAchievements = (savedAchievements) => {
  // If no saved achievements, return the default data
  if (!savedAchievements) {
    return achievementsData;
  }

  // Merge saved unlock status with the full achievement data
  return achievementsData.map((achievement) => ({
    ...achievement,
    unlocked: savedAchievements.find(a => a.id === achievement.id)?.unlocked || false,
  }));
};

// Helper function to calculate daily sessions
const getDailySessions = (sessions) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return sessions.filter(session => 
    format(new Date(session.startTime), 'yyyy-MM-dd') === today
  ).length;
};

// Helper function to calculate morning sessions
const getMorningSessions = (sessions) => {
  return sessions.filter(session => {
    const hour = getHours(new Date(session.startTime));
    return hour < 12; // Before noon
  }).length;
};

// Helper function to calculate break compliance
const getBreakCompliance = (sessions) => {
  let consecutiveCompliant = 0;
  let maxCompliant = 0;
  
  for (let i = sessions.length - 1; i >= 0; i--) {
    const session = sessions[i];
    if (session.breakDuration && session.breakDuration >= 300) { // At least 5 minutes break
      consecutiveCompliant++;
      maxCompliant = Math.max(maxCompliant, consecutiveCompliant);
    } else {
      consecutiveCompliant = 0;
    }
  }
  
  return maxCompliant;
};

// Helper function to calculate weekly compliance
const getWeeklyCompliance = (sessions) => {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay()); // Start of week
  
  const daysWithSessions = new Set();
  sessions.forEach(session => {
    const sessionDate = new Date(session.startTime);
    if (sessionDate >= weekStart && sessionDate <= today) {
      daysWithSessions.add(format(sessionDate, 'yyyy-MM-dd'));
    }
  });
  
  return daysWithSessions.size;
};

// Helper function to calculate time of day variety
const getTimeOfDayVariety = (sessions) => {
  const timeSlots = new Set();
  sessions.forEach(session => {
    const hour = getHours(new Date(session.startTime));
    if (hour < 12) timeSlots.add('morning');
    else if (hour < 17) timeSlots.add('afternoon');
    else timeSlots.add('evening');
  });
  return timeSlots.size;
};

// Check if achievements are unlocked
export const checkAchievements = (achievements, sessions, streak) => {
  // Calculate all necessary metrics
  const completedSessions = sessions.filter(s => s.completed).length;
  const lastSessionTime = sessions.length > 0 ? sessions[sessions.length - 1].startTime : null;
  const dailySessions = getDailySessions(sessions);
  const breakCompliance = getBreakCompliance(sessions);
  const weeklyCompliance = getWeeklyCompliance(sessions);
  const morningSessions = getMorningSessions(sessions);
  const timeOfDayVariety = getTimeOfDayVariety(sessions);

  return achievements.map((achievement) => {
    const isUnlocked = achievement.unlocked || achievement.condition(
      completedSessions,
      streak,
      lastSessionTime,
      dailySessions,
      breakCompliance,
      weeklyCompliance,
      morningSessions,
      timeOfDayVariety
    );
    
    if (isUnlocked && !achievement.unlocked) {
      console.log(`Achievement Unlocked: ${achievement.name}`);
      showToast.success(`Achievement Unlocked: ${achievement.name}`);
    }
    return { ...achievement, unlocked: isUnlocked };
  });
};