import { loadAchievements } from "../utils/storage";
import AchievementsList from "../components/timer/AchievementsList";
import Navbar from '../components/ui/Navbar';

const AchievementsPage = () => {
  const achievements = loadAchievements() || []; 
  return (
    <div>
    <Navbar />
      <h1>Your Achievements</h1>
      <AchievementsList achievements={achievements} />
    </div>
  );
};

export default AchievementsPage;