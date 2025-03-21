/**
 * FocusPatterns Component
 * 
 * Analyzes and visualizes user's focus patterns:
 * - Most productive hours
 * - Best days of the week
 * - Session duration patterns
 * - Break patterns
 */

import React, { useMemo } from 'react';
import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { format, getHours, getDay } from 'date-fns';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FocusPatterns = () => {
  const { sessions } = useContext(TimerContext);

  /**
   * Analyze productivity patterns by hour of day
   */
  const hourlyPatterns = useMemo(() => {
    const hourlyData = Array(24).fill(0).map((_, i) => ({
      hour: i,
      sessions: 0,
      totalMinutes: 0,
      productivity: 0
    }));

    sessions.forEach(session => {
      const hour = getHours(new Date(session.startTime));
      hourlyData[hour].sessions++;
      hourlyData[hour].totalMinutes += session.duration / 60;
      
      // Calculate productivity based on completion and duration
      const productivity = session.completed ? session.duration / 60 : 0;
      hourlyData[hour].productivity += productivity;
    });

    // Format hours and calculate averages
    return hourlyData.map(data => ({
      ...data,
      hour: format(new Date().setHours(data.hour), 'ha'),
      avgDuration: data.sessions > 0 ? Math.round(data.totalMinutes / data.sessions) : 0,
      productivity: data.sessions > 0 ? Math.round(data.productivity / data.sessions) : 0
    }));
  }, [sessions]);

  /**
   * Analyze patterns by day of week
   */
  const dailyPatterns = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dailyData = days.map(day => ({
      day,
      sessions: 0,
      totalMinutes: 0,
      productivity: 0
    }));

    sessions.forEach(session => {
      const dayIndex = getDay(new Date(session.startTime));
      dailyData[dayIndex].sessions++;
      dailyData[dayIndex].totalMinutes += session.duration / 60;
      
      const productivity = session.completed ? session.duration / 60 : 0;
      dailyData[dayIndex].productivity += productivity;
    });

    return dailyData.map(data => ({
      ...data,
      avgDuration: data.sessions > 0 ? Math.round(data.totalMinutes / data.sessions) : 0,
      productivity: data.sessions > 0 ? Math.round(data.productivity / data.sessions) : 0
    }));
  }, [sessions]);

  /**
   * Identify optimal focus periods
   */
  const optimalPeriods = useMemo(() => {
    const bestHours = hourlyPatterns
      .filter(h => h.sessions > 0)
      .sort((a, b) => b.productivity - a.productivity)
      .slice(0, 3);

    const bestDays = dailyPatterns
      .filter(d => d.sessions > 0)
      .sort((a, b) => b.productivity - a.productivity)
      .slice(0, 3);

    return { bestHours, bestDays };
  }, [hourlyPatterns, dailyPatterns]);

  return (
    <div className="focus-patterns bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold">Focus Patterns</h2>

      {/* Optimal Times */}
      <div className="optimal-times">
        <h3 className="text-sm font-medium mb-2">Best Focus Times</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs text-gray-500">Most Productive Hours</h4>
            <ul className="mt-1">
              {optimalPeriods.bestHours.map((hour, index) => (
                <li key={hour.hour} className="text-sm">
                  {index + 1}. {hour.hour} ({hour.productivity} min avg)
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs text-gray-500">Most Productive Days</h4>
            <ul className="mt-1">
              {optimalPeriods.bestDays.map((day, index) => (
                <li key={day.day} className="text-sm">
                  {index + 1}. {day.day} ({day.productivity} min avg)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Hourly Pattern Chart */}
      <div>
        <h3 className="text-sm font-medium mb-2">Hourly Focus Pattern</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyPatterns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{`${label}`}</p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{`Focus Time: ${payload[0].value} min`}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{`Productivity: ${payload[1].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="productivity" name="Productivity (min)" fill="#8884d8" />
              <Bar dataKey="sessions" name="Sessions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Pattern Chart */}
      <div>
        <h3 className="text-sm font-medium mb-2">Daily Focus Pattern</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyPatterns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{`Day: ${label}`}</p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{`Focus Time: ${payload[0].value} min`}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{`Productivity: ${payload[1].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="productivity" name="Productivity (min)" fill="#8884d8" />
              <Bar dataKey="sessions" name="Sessions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FocusPatterns; 