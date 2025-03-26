import React, { useState, useMemo } from 'react';
import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import FilterControls from './FilterControls';
import ComparisonChart from './ComparisonChart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const AdvancedDashboard = () => {
  // Access global timer context
  const { sessions, breaks } = useContext(TimerContext);
  
  // State for filtering and comparison controls
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [comparisonPeriod, setComparisonPeriod] = useState('week'); // Options: week, month, custom

  /**
   * Filter sessions based on selected date range
   * Returns all sessions if no date range is selected
   */
  const filteredData = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return sessions;
    
    return sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= dateRange.start && sessionDate <= dateRange.end;
    });
  }, [sessions, dateRange]);

  /**
   * Calculate key productivity metrics from filtered data:
   * - Average session duration
   * - Total focus time
   * - Sessions per day
   * - Session completion rate
   */
  const metrics = useMemo(() => {
    return {
      averageSessionDuration: filteredData.reduce((acc, session) => acc + session.duration, 0) / filteredData.length / 60,
      totalFocusTime: filteredData.reduce((acc, session) => acc + session.duration, 0) / 60,
      sessionsPerDay: filteredData.length / (dateRange.start && dateRange.end ? 
        Math.ceil((dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24)) : 1),
      completionRate: (filteredData.filter(s => s.completed).length / filteredData.length) * 100
    };
  }, [filteredData, dateRange]);

  /**
   * Transform session data for comparison visualization
   * Groups data by day/week/month based on selected comparison period
   */
  const comparisonData = useMemo(() => {
    const groupedData = filteredData.reduce((acc, session) => {
      // Format date based on selected period
      const date = format(new Date(session.startTime), 
        comparisonPeriod === 'week' ? 'yyyy-ww' : 
        comparisonPeriod === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd');
      
      // Accumulate time and count for each period
      if (!acc[date]) acc[date] = { totalTime: 0, count: 0 };
      acc[date].totalTime += session.duration / 60;
      acc[date].count += 1;
      return acc;
    }, {});

    // Transform grouped data into chart-friendly format
    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      totalTime: Math.round(data.totalTime),
      averageTime: Math.round(data.totalTime / data.count),
      sessions: data.count
    }));
  }, [filteredData, comparisonPeriod]);

  /**
   * Handle data export in different formats
   * @param {string} format - 'csv' or 'json'
   */
  const handleExport = (format) => {
    const data = {
      metrics,
      sessions: filteredData,
      comparison: comparisonData
    };

    if (format === 'csv') {
      const csv = convertToCSV(data);
      downloadFile(csv, 'productivity_data.csv', 'text/csv');
    } else if (format === 'json') {
      downloadFile(JSON.stringify(data, null, 2), 'productivity_data.json', 'application/json');
    }
  };

  return (
    <div className="advanced-dashboard space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Average Session</h3>
          <p className="text-2xl font-bold text-blue-600">{Math.round(metrics.averageSessionDuration)} min</p>
        </div>
        <div className="stat-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Focus</h3>
          <p className="text-2xl font-bold text-green-600">{Math.round(metrics.totalFocusTime)} min</p>
        </div>
        <div className="stat-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Daily Sessions</h3>
          <p className="text-2xl font-bold text-purple-600">{Math.round(metrics.sessionsPerDay * 10) / 10}</p>
        </div>
        <div className="stat-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Completion</h3>
          <p className="text-2xl font-bold text-orange-600">{Math.round(metrics.completionRate)}%</p>
        </div>
      </div>

      <div className="comparison-chart bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-4 text-gray-600 dark:text-gray-300">Focus Time Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11 }}
                stroke="currentColor"
                opacity={0.5}
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                stroke="currentColor"
                opacity={0.5}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{`Date: ${label}`}</p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{`Total Time: ${payload[0].value} min`}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{`Avg Time: ${payload[1].value} min`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line 
                type="monotone" 
                dataKey="totalTime" 
                stroke="#8884d8" 
                name="Total Time (min)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="averageTime" 
                stroke="#82ca9d" 
                name="Avg Time (min)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

/**
 * Convert data object to CSV format
 * @param {Object} data - Data object containing comparison metrics
 * @returns {string} CSV formatted string
 */
const convertToCSV = (data) => {
  const headers = ['Date', 'Total Time (min)', 'Average Time (min)', 'Sessions'];
  const rows = data.comparison.map(row => [
    row.date,
    row.totalTime,
    row.averageTime,
    row.sessions
  ]);
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

/**
 * Create and trigger download of a file
 * @param {string} content - File content
 * @param {string} filename - Name of the file to download
 * @param {string} contentType - MIME type of the file
 */
const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default AdvancedDashboard; 