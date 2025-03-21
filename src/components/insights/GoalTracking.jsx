/**
 * GoalTracking Component
 * 
 * Allows users to set and track productivity goals:
 * - Daily session targets
 * - Focus time goals
 * - Streak goals
 * - Custom goals
 */

import React, { useState, useMemo } from 'react';
import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GoalTracking = () => {
  const { sessions, streak, settings } = useContext(TimerContext);
  const [selectedGoal, setSelectedGoal] = useState('daily');

  /**
   * Calculate progress towards different types of goals
   */
  const goalProgress = useMemo(() => {
    const dailyGoal = settings?.dailyGoal || 4;
    const weeklyGoal = dailyGoal * 7;
    const focusTimeGoal = settings?.focusTimeGoal || 120; // 2 hours in minutes

    // Calculate daily sessions
    const today = new Date();
    const todaySessions = sessions.filter(session => 
      format(new Date(session.startTime), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    ).length;

    // Calculate weekly sessions
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const weekSessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= weekStart && sessionDate <= weekEnd;
    }).length;

    // Calculate total focus time today
    const todayFocusTime = sessions
      .filter(session => format(new Date(session.startTime), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'))
      .reduce((total, session) => total + session.duration / 60, 0);

    return {
      daily: {
        current: todaySessions,
        target: dailyGoal,
        progress: (todaySessions / dailyGoal) * 100
      },
      weekly: {
        current: weekSessions,
        target: weeklyGoal,
        progress: (weekSessions / weeklyGoal) * 100
      },
      focusTime: {
        current: Math.round(todayFocusTime),
        target: focusTimeGoal,
        progress: (todayFocusTime / focusTimeGoal) * 100
      },
      streak: {
        current: streak,
        target: settings?.streakGoal || 7,
        progress: (streak / (settings?.streakGoal || 7)) * 100
      }
    };
  }, [sessions, streak, settings]);

  /**
   * Generate weekly progress data for visualization
   */
  const weeklyProgressData = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(today) });

    return weekDays.map(date => {
      const dayStr = format(date, 'yyyy-MM-dd');
      const daySessions = sessions.filter(session => 
        format(new Date(session.startTime), 'yyyy-MM-dd') === dayStr
      );

      return {
        date: format(date, 'EEE'),
        sessions: daySessions.length,
        focusTime: Math.round(daySessions.reduce((total, session) => total + session.duration / 60, 0))
      };
    });
  }, [sessions]);

  // Helper function to get progress color
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="goal-tracking bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Goal Tracking</h2>

      {/* Goal Type Selector */}
      <div className="flex gap-2 mb-6">
        {Object.keys(goalProgress).map(goal => (
          <button
            key={goal}
            onClick={() => setSelectedGoal(goal)}
            className={`px-3 py-1 rounded text-sm ${
              selectedGoal === goal 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {goal.charAt(0).toUpperCase() + goal.slice(1)}
          </button>
        ))}
      </div>

      {/* Current Goal Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            {goalProgress[selectedGoal].current} / {goalProgress[selectedGoal].target}
            {selectedGoal === 'focusTime' ? ' minutes' : ''}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(goalProgress[selectedGoal].progress)}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(goalProgress[selectedGoal].progress)}`}
            style={{ width: `${Math.min(100, goalProgress[selectedGoal].progress)}%` }}
          />
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div>
        <h3 className="text-sm font-medium mb-2">Weekly Progress</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{`Date: ${label}`}</p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{`Progress: ${payload[0].value}%`}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{`Target: ${payload[1].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="#8884d8" 
                name="Sessions"
              />
              <Line 
                type="monotone" 
                dataKey="focusTime" 
                stroke="#82ca9d" 
                name="Focus Time (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GoalTracking; 