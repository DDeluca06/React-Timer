import { showToast } from "./Notifications";
import { achievementsData } from "../data/achievements";

export const getAchievements = (savedAchievements) => {
  return achievementsData.map((achievement) => ({
    ...achievement,
    // Merge with saved data (if any)
    unlocked: savedAchievements?.find(a => a.id === achievement.id)?.unlocked || false,
  }));
};

// Check if achievements are unlocked
export const checkAchievements = (achievements, completedSessions, currentStreak) => {
  return achievements.map((achievement) => {
    const isUnlocked = achievement.unlocked || achievement.condition(completedSessions, currentStreak);
    if (isUnlocked && !achievement.unlocked) {
      console.log(`Achievement Unlocked: ${achievement.name}`);
      showToast.success(`Achievement Unlocked: ${achievement.name}`);
    }
    return { ...achievement, unlocked: isUnlocked };
  });
};