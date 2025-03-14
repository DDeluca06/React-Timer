import { showToast } from "./Notifications";
import { achievementsData } from "../data/achievements";

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