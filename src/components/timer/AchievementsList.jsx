import { useContext, useMemo } from "react";
import { TimerContext } from "../../context/TimerContext";

const AchievementsList = () => {
  const { achievements } = useContext(TimerContext);

  // Group achievements by category
  const groupedAchievements = useMemo(() => {
    if (!Array.isArray(achievements)) {
      console.error("Achievements is not an array:", achievements);
      return {};
    }
    return achievements.reduce((acc, achievement) => {
      const category = achievement.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(achievement);
      return acc;
    }, {});
  }, [achievements]);

  // Get all unique categories
  const categories = useMemo(() => {
    return Object.keys(groupedAchievements).sort();
  }, [groupedAchievements]);

  return (
    <div className="p-4">
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text border-b-2 border-gray-200 dark:border-gray-700 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedAchievements[category].map((achievement) => (
                <div
                  key={achievement.id}
                  className={`
                    relative p-6 rounded-lg shadow-md transition-all duration-300
                    ${achievement.unlocked 
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:shadow-lg hover:-translate-y-1' 
                      : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg hover:-translate-y-1'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                        {achievement.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      {achievement.unlocked ? (
                        <span className="text-green-500 dark:text-green-400 text-2xl">✔️</span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-2xl">🔒</span>
                      )}
                    </div>
                  </div>
                  {!achievement.unlocked && (
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
                      Locked - Keep working to unlock this achievement!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;