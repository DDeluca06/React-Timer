import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const AchievementsList = () => {
  const { achievements } = useContext(TimerContext);

  return (
    <div>
      <h2>Achievements</h2>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <strong>{achievement.name}</strong>: {achievement.description}
            {achievement.unlocked ? " ✔️" : " (Locked)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsList;