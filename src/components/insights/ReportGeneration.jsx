/**
 * ReportGeneration Component
 * 
 * Generates detailed productivity reports including:
 * - Session summaries
 * - Goal achievement rates
 * - Productivity trends
 * - Recommendations
 */

import React, { useState, useMemo } from 'react';
import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks } from 'date-fns';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const ReportGeneration = () => {
  const { sessions, streak, settings } = useContext(TimerContext);
  const [reportPeriod, setReportPeriod] = useState('week');
  const [showDetails, setShowDetails] = useState(false);

  /**
   * Calculate report metrics based on the selected period
   */
  const reportMetrics = useMemo(() => {
    const today = new Date();
    const periodStart = reportPeriod === 'week' 
      ? startOfWeek(today)
      : startOfWeek(subWeeks(today, 3));

    const periodSessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= periodStart && sessionDate <= today;
    });

    // Calculate total metrics
    const totalFocusTime = periodSessions.reduce((total, session) => total + session.duration / 60, 0);
    const totalBreakTime = periodSessions.reduce((total, session) => total + (session.breakDuration || 0) / 60, 0);
    const completedSessions = periodSessions.length;
    const averageSessionLength = completedSessions > 0 ? totalFocusTime / completedSessions : 0;

    // Calculate goal achievement
    const dailyGoal = settings?.dailyGoal || 4;
    const daysInPeriod = reportPeriod === 'week' ? 7 : 28;
    const goalAchievementRate = (completedSessions / (dailyGoal * daysInPeriod)) * 100;

    return {
      totalFocusTime: Math.round(totalFocusTime),
      totalBreakTime: Math.round(totalBreakTime),
      completedSessions,
      averageSessionLength: Math.round(averageSessionLength),
      goalAchievementRate: Math.round(goalAchievementRate),
      currentStreak: streak
    };
  }, [sessions, streak, settings, reportPeriod]);

  /**
   * Generate daily progress data for the chart
   */
  const progressData = useMemo(() => {
    const today = new Date();
    const periodStart = reportPeriod === 'week' 
      ? startOfWeek(today)
      : startOfWeek(subWeeks(today, 3));
    
    const days = eachDayOfInterval({ start: periodStart, end: today });

    return days.map(date => {
      const dayStr = format(date, 'yyyy-MM-dd');
      const daySessions = sessions.filter(session => 
        format(new Date(session.startTime), 'yyyy-MM-dd') === dayStr
      );

      return {
        date: format(date, 'MMM dd'),
        sessions: daySessions.length,
        focusTime: Math.round(daySessions.reduce((total, session) => total + session.duration / 60, 0)),
        breakTime: Math.round(daySessions.reduce((total, session) => total + (session.breakDuration || 0) / 60, 0))
      };
    });
  }, [sessions, reportPeriod]);

  return (
    <div className="report-generation bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Productivity Report</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setReportPeriod('week')}
            className={`px-3 py-1 rounded text-sm ${
              reportPeriod === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setReportPeriod('month')}
            className={`px-3 py-1 rounded text-sm ${
              reportPeriod === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <div className="text-sm text-gray-500">Focus Time</div>
          <div className="text-lg font-semibold">{reportMetrics.totalFocusTime} min</div>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <div className="text-sm text-gray-500">Sessions</div>
          <div className="text-lg font-semibold">{reportMetrics.completedSessions}</div>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <div className="text-sm text-gray-500">Goal Achievement</div>
          <div className="text-lg font-semibold">{reportMetrics.goalAchievementRate}%</div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Progress Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{`Date: ${label}`}</p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{`Sessions: ${payload[0].value}`}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{`Focus Time: ${payload[1].value} min`}</p>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">{`Break Time: ${payload[2].value} min`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="sessions" fill="#8884d8" name="Sessions" />
              <Line type="monotone" dataKey="focusTime" stroke="#82ca9d" name="Focus Time (min)" />
              <Line type="monotone" dataKey="breakTime" stroke="#ffc658" name="Break Time (min)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-sm text-blue-500 hover:text-blue-600"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
          <span className="ml-1">{showDetails ? '▼' : '▶'}</span>
        </button>
        
        {showDetails && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Average Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Avg. Session Length</div>
                  <div>{reportMetrics.averageSessionLength} min</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Current Streak</div>
                  <div>{reportMetrics.currentStreak} days</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Break Analysis</h4>
              <div>
                <div className="text-sm text-gray-500">Total Break Time</div>
                <div>{reportMetrics.totalBreakTime} min</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="flex gap-2">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            // TODO: Implement export functionality
            alert('Export functionality coming soon!');
          }}
        >
          Export Report
        </button>
      </div>
    </div>
  );
};

export default ReportGeneration; 