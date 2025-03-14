import { useContext, useMemo } from 'react';
import { TimerContext } from '../context/TimerContext';
import NavBar from '../components/ui/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function Stats() {
  const { sessions, streak, breaks } = useContext(TimerContext);

  // Prepare data for session duration line chart
  const sessionData = useMemo(() => {
    return sessions.map(session => ({
      time: new Date(session.startTime).toLocaleDateString(),
      duration: Math.round(session.duration / 60), // Convert to minutes
    }));
  }, [sessions]);

  // Prepare data for daily focus time
  const dailyFocusData = useMemo(() => {
    const dailyMap = sessions.reduce((acc, session) => {
      const date = new Date(session.startTime).toLocaleDateString();
      acc[date] = (acc[date] || 0) + session.duration / 60;
      return acc;
    }, {});

    return Object.entries(dailyMap).map(([date, minutes]) => ({
      date,
      minutes: Math.round(minutes),
    }));
  }, [sessions]);

  // Prepare data for break vs focus time pie chart
  const timeDistributionData = useMemo(() => {
    const totalFocusTime = sessions.reduce((sum, session) => sum + session.duration, 0);
    const totalBreakTime = breaks
      .filter(br => br.endTime !== null)
      .reduce((sum, br) => sum + br.duration, 0);

    return [
      { name: 'Focus Time', value: Math.round(totalFocusTime / 60) },
      { name: 'Break Time', value: Math.round(totalBreakTime / 60) },
    ];
  }, [sessions, breaks]);

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="page-container p-4 max-w-7xl mx-auto">
      <NavBar />
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Current Streak</h2>
          <p className="text-2xl font-bold text-blue-600">{streak} days</p>
        </div>
        <div className="stat-card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Break Count</h2>
          <p className="text-2xl font-bold text-green-600">{breaks.filter(br => br.endTime !== null).length}</p>
        </div>
        <div className="stat-card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Sessions</h2>
          <p className="text-2xl font-bold text-purple-600">{sessions.length}</p>
        </div>
        <div className="stat-card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Break Time</h2>
          <p className="text-2xl font-bold text-orange-600">
            {Math.round(breaks
              .filter((br) => br.endTime !== null)
              .reduce((total, br) => total + br.duration, 0) / 60)} min
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Session Duration Line Chart */}
        <div className="chart-container bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Session Duration Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="duration" stroke="#8884d8" name="Duration (min)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Focus Bar Chart */}
        <div className="chart-container bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Daily Focus Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyFocusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="minutes" fill="#82ca9d" name="Focus Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Distribution Pie Chart */}
        <div className="chart-container bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Time Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}min`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Sessions List */}
        <div className="recent-sessions bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Recent Sessions</h2>
          <div className="h-64 overflow-y-auto">
            <ul className="space-y-2">
              {sessions.slice(-5).reverse().map((session) => (
                <li key={session.id} className="border-b dark:border-gray-700 pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(session.startTime).toLocaleString()}
                      </p>
                      <p className="text-sm font-medium">
                        Duration: {Math.round(session.duration / 60)} minutes
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default Stats;