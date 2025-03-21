import React, { useMemo } from 'react';
import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { format } from 'date-fns';

const ProductivityScore = () => {
  const { sessions, breaks, settings } = useContext(TimerContext);

  /**
   * Calculate various productivity metrics and combine them into a final score
   */
  const productivityMetrics = useMemo(() => {
    // 1. Session Completion Rate (30% of score)
    const completionRate = sessions.length > 0
      ? (sessions.filter(s => s.completed).length / sessions.length) * 30
      : 0;

    // 2. Break Adherence (20% of score)
    const breakAdherence = breaks.length > 0
      ? (breaks.filter(b => b.endTime !== null).length / breaks.length) * 20
      : 0;

    // 3. Focus Time Consistency (25% of score)
    const focusConsistency = (() => {
      if (sessions.length < 2) return 0;
      
      const durations = sessions.map(s => s.duration / 60); // in minutes
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const variance = durations.reduce((a, b) => a + Math.pow(b - avgDuration, 2), 0) / durations.length;
      const consistency = Math.max(0, 25 - (variance / 100));
      return consistency;
    })();

    // 4. Daily Goal Achievement (25% of score)
    const dailyGoalAchievement = (() => {
      const dailyGoal = settings?.dailyGoal || 4; // Default to 4 sessions per day
      const sessionsByDay = sessions.reduce((acc, session) => {
        const date = format(new Date(session.startTime), 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const daysWithGoalMet = Object.values(sessionsByDay)
        .filter(count => count >= dailyGoal).length;
      const totalDays = Object.keys(sessionsByDay).length || 1;

      return (daysWithGoalMet / totalDays) * 25;
    })();

    // Calculate total score
    const totalScore = Math.round(
      completionRate +
      breakAdherence +
      focusConsistency +
      dailyGoalAchievement
    );

    return {
      totalScore,
      metrics: {
        completionRate: Math.round(completionRate / 0.3), // Convert back to percentage
        breakAdherence: Math.round(breakAdherence / 0.2),
        focusConsistency: Math.round(focusConsistency / 0.25),
        dailyGoalAchievement: Math.round(dailyGoalAchievement / 0.25)
      }
    };
  }, [sessions, breaks, settings]);

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="productivity-score bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Productivity Score</h2>
      
      {/* Overall Score */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getScoreColor(productivityMetrics.totalScore)}`}>
          {productivityMetrics.totalScore}
        </div>
        <div className="text-sm text-gray-500">Overall Score</div>
      </div>

      {/* Individual Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="metric">
          <div className="text-sm font-medium">Session Completion</div>
          <div className="text-lg font-semibold">
            {productivityMetrics.metrics.completionRate}%
          </div>
        </div>
        <div className="metric">
          <div className="text-sm font-medium">Break Adherence</div>
          <div className="text-lg font-semibold">
            {productivityMetrics.metrics.breakAdherence}%
          </div>
        </div>
        <div className="metric">
          <div className="text-sm font-medium">Focus Consistency</div>
          <div className="text-lg font-semibold">
            {productivityMetrics.metrics.focusConsistency}%
          </div>
        </div>
        <div className="metric">
          <div className="text-sm font-medium">Goal Achievement</div>
          <div className="text-lg font-semibold">
            {productivityMetrics.metrics.dailyGoalAchievement}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityScore; 