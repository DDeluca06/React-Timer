import { showToast } from "./Notifications.jsx";
import  {achievementsData} from "../data/achievements.js";

console.log("Achievements Data::::> 0", typeof(achievementsData), achievementsData);

export const getAchievements = () => {
  
  // Retrieve saved achievements from localStorage or wherever they are stored
  const achievementsData = JSON.parse(localStorage.getItem("achievements")) || []; // Ensure default is an empty array

  console.log("Achievements Data::::> ", typeof(achievementsData), achievementsData);

  // Check if achievementsData is an array before using find
  if (achievementsData) {
    // Your code that uses achievementsData.find goes here
    const currentAchievement = achievementsData.find(
      (achievement) => achievement.id === id // Assuming 'id' is defined in this scope
    );
    // ... rest of your logic
  } else {
    console.error("achievementsData is not an array:", achievementsData);
    // Handle the case where achievementsData is not an array, perhaps return a default value or throw an error
  }
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