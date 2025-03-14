import AchievementsList from "../components/timer/AchievementsList";
import Navbar from '../components/ui/NavBar';

const AchievementsPage = () => {
  
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-8 text-light-text dark:text-dark-text">
        Your Achievements
      </h1>
      <AchievementsList />
    </div>
  );
};

export default AchievementsPage;