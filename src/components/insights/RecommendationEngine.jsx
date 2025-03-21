/**
 * RecommendationEngine Component
 * 
 * Analyzes user's productivity patterns and provides personalized recommendations:
 * - Optimal session duration
 * - Best times to work
 * - Break patterns
 * - Goal adjustments
 */

import React, { useMemo } from 'react';
import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { format, getHours, differenceInMinutes } from 'date-fns';

const RecommendationEngine = () => {
  const { sessions, breaks, settings } = useContext(TimerContext);

  /**
   * Generate personalized recommendations based on user's patterns
   */
  const recommendations = useMemo(() => {
    if (sessions.length === 0) {
      return {
        sessionDuration: null,
        breakPattern: null,
        timeOfDay: null,
        goalAdjustment: null,
        recommendations: [
          "Start your first focus session to receive personalized recommendations!"
        ]
      };
    }

    // Analyze completed sessions
    const completedSessions = sessions.filter(s => s.completed);
    const avgSessionDuration = completedSessions.reduce((acc, s) => acc + s.duration, 0) / completedSessions.length;
    
    // Analyze successful breaks
    const completedBreaks = breaks.filter(b => b.endTime !== null);
    const avgBreakDuration = completedBreaks.reduce((acc, b) => acc + b.duration, 0) / completedBreaks.length;

    // Find most productive hours
    const sessionsByHour = sessions.reduce((acc, session) => {
      const hour = getHours(new Date(session.startTime));
      if (!acc[hour]) acc[hour] = { count: 0, completed: 0 };
      acc[hour].count++;
      if (session.completed) acc[hour].completed++;
      return acc;
    }, {});

    // Calculate success rates by hour
    const hourlySuccess = Object.entries(sessionsByHour).map(([hour, data]) => ({
      hour: parseInt(hour),
      successRate: (data.completed / data.count) * 100
    }));

    // Generate recommendations
    const recommendations = [];
    const currentSettings = settings?.timerPresets || { pomodoro: 1500 }; // 25 minutes default

    // 1. Session Duration Recommendations
    const optimalDuration = Math.round(avgSessionDuration / 60);
    const currentDuration = Math.round(currentSettings.pomodoro / 60);
    if (Math.abs(optimalDuration - currentDuration) > 5) {
      recommendations.push(
        `Consider ${optimalDuration > currentDuration ? 'increasing' : 'decreasing'} your session duration to ${optimalDuration} minutes based on your completion patterns.`
      );
    }

    // 2. Break Pattern Recommendations
    const optimalBreak = Math.round(avgBreakDuration / 60);
    if (optimalBreak > 0) {
      recommendations.push(
        `Your most effective breaks last around ${optimalBreak} minutes.`
      );
    }

    // 3. Time of Day Recommendations
    const bestHours = hourlySuccess
      .filter(h => h.successRate > 70)
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 2);
    
    if (bestHours.length > 0) {
      const timeRanges = bestHours
        .map(h => format(new Date().setHours(h.hour), 'ha'))
        .join(' or ');
      recommendations.push(
        `You're most productive when starting sessions around ${timeRanges}.`
      );
    }

    // 4. Goal Adjustments
    const dailySessionCount = sessions.reduce((acc, session) => {
      const date = format(new Date(session.startTime), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const avgDailySessions = Object.values(dailySessionCount).reduce((a, b) => a + b, 0) / Object.keys(dailySessionCount).length;
    const currentGoal = settings?.dailyGoal || 4;

    if (Math.abs(avgDailySessions - currentGoal) > 1) {
      recommendations.push(
        `Consider ${avgDailySessions > currentGoal ? 'increasing' : 'decreasing'} your daily goal to ${Math.round(avgDailySessions)} sessions to better match your patterns.`
      );
    }

    return {
      sessionDuration: completedSessions.length > 0 ? optimalDuration : null,
      breakPattern: completedBreaks.length > 0 ? optimalBreak : null,
      timeOfDay: bestHours,
      goalAdjustment: Math.round(avgDailySessions),
      recommendations
    };
  }, [sessions, breaks, settings]);

  return (
    <div className="recommendations bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Personalized Recommendations</h2>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.recommendations.map((recommendation, index) => (
          <div key={index} className="recommendation-item flex items-start gap-3">
            <div className="recommendation-icon text-blue-500">
              💡
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</p>
          </div>
        ))}
      </div>

      {/* Summary Metrics */}
      {(recommendations.sessionDuration || recommendations.breakPattern) && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {recommendations.sessionDuration && (
            <div className="metric">
              <div className="text-sm text-gray-500 dark:text-gray-400">Optimal Session Length</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {recommendations.sessionDuration} minutes
              </div>
            </div>
          )}
          {recommendations.breakPattern && (
            <div className="metric">
              <div className="text-sm text-gray-500 dark:text-gray-400">Optimal Break Length</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {recommendations.breakPattern} minutes
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationEngine; 