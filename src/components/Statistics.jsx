import React, { useState, useContext, useMemo } from 'react';
import { TimerContext } from '../context/TimerContext';
import AdvancedDashboard from './analytics/AdvancedDashboard';
import FilterControls from './analytics/FilterControls';
import ComparisonChart from './analytics/ComparisonChart';
import ProductivityScore from './insights/ProductivityScore';
import FocusPatterns from './insights/FocusPatterns';
import RecommendationEngine from './insights/RecommendationEngine';
import GoalTracking from './insights/GoalTracking';
import ReportGeneration from './insights/ReportGeneration';

const Statistics = () => {
  const { sessions, breaks, settings, streak } = useContext(TimerContext);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [comparisonPeriod, setComparisonPeriod] = useState('week');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  // Calculate basic statistics
  const basicStats = useMemo(() => ({
    totalSessions: sessions.length,
    totalBreaks: breaks.filter(br => br.endTime !== null).length,
    totalBreakTime: Math.round(breaks
      .filter((br) => br.endTime !== null)
      .reduce((total, br) => total + br.duration, 0) / 60),
    totalFocusTime: Math.round(sessions.reduce((total, session) => total + session.duration / 60, 0))
  }), [sessions, breaks]);

  // Process data for comparison chart
  const comparisonData = sessions.map(session => ({
    date: new Date(session.startTime).toLocaleDateString(),
    totalTime: Math.round(session.duration / 60),
    averageTime: Math.round(session.duration / 60),
    sessions: 1
  }));

  const renderAdvancedContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b-2 border-gray-100 dark:border-gray-700 pb-4 mb-6">Advanced Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg h-[300px] overflow-auto">
                <AdvancedDashboard />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg h-[225px]">
                <FilterControls 
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  comparisonPeriod={comparisonPeriod}
                  onComparisonPeriodChange={setComparisonPeriod}
                />
              </div>
            </div>
            <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg h-[420px] overflow-hidden">
              <ComparisonChart period={comparisonPeriod} data={comparisonData} />
            </div>
          </section>
        );
      case 'insights':
        return (
          <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b-2 border-gray-100 dark:border-gray-700 pb-4 mb-6">Productivity Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg h-[320px] overflow-auto">
                <ProductivityScore />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg h-[400px] overflow-auto">
                <FocusPatterns />
              </div>
            </div>
            <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg">
              <RecommendationEngine />
            </div>
          </section>
        );
      case 'goals':
        return (
          <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b-2 border-gray-100 dark:border-gray-700 pb-4 mb-6">Goal Tracking</h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg h-[500px] overflow-auto">
              <GoalTracking />
            </div>
          </section>
        );
      case 'reports':
        return (
          <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b-2 border-gray-100 dark:border-gray-700 pb-4 mb-6">Reports</h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-lg">
              <ReportGeneration />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="statistics-container p-6 space-y-8">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Statistics</h1>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors shadow-md"
        >
          {showAdvanced ? 'Show Basic View' : 'Show Advanced Analytics'}
        </button>
      </div>

      {!showAdvanced ? (
        // Basic Stats View
        <div className="space-y-8">
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stat-card bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Current Streak</h2>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{streak} day{streak === 1 ? '' : 's'}</p>
            </div>
            <div className="stat-card bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Total Sessions</h2>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{basicStats.totalSessions}</p>
            </div>
            <div className="stat-card bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Focus Time</h2>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{basicStats.totalFocusTime} min</p>
            </div>
            <div className="stat-card bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 transition-colors">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Break Time</h2>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{basicStats.totalBreakTime} min</p>
            </div>
          </div>

          {/* Recent Sessions List */}
          <div className="recent-sessions bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-100">Recent Sessions</h2>
            <div className="h-64 overflow-y-auto pr-2">
              <ul className="space-y-4">
                {sessions.slice(-5).reverse().map((session) => (
                  <li key={session.id} className="border-b-2 border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(session.startTime).toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Duration: {Math.round(session.duration / 60)} minutes
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {session.completed ? 
                          <span className="text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">✓ Completed</span> : 
                          <span className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">× Incomplete</span>
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // Advanced Analytics View with Tabs
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-2 border-b-2 border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'analytics'
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-b-0 border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'insights'
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-b-0 border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Insights
            </button>
            <button
              onClick={() => setActiveTab('goals')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'goals'
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-b-0 border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Goals
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'reports'
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-b-0 border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Reports
            </button>
          </div>

          {/* Tab Content */}
          {renderAdvancedContent()}
        </div>
      )}
    </div>
  );
};

export default Statistics; 