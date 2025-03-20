import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ComparisonChart = ({ data, period }) => {
  // Transform data for period-over-period comparison
  const transformedData = data.map((item, index) => {
    const prevPeriod = data[index - 1];
    return {
      ...item,
      previousTotalTime: prevPeriod ? prevPeriod.totalTime : 0,
      change: prevPeriod ? ((item.totalTime - prevPeriod.totalTime) / prevPeriod.totalTime * 100).toFixed(1) : 0
    };
  });

  return (
    <div className="comparison-chart bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">Period-over-Period Comparison</h3>
        <div className="text-xs text-gray-500">
          Showing {period === 'week' ? 'weekly' : period === 'month' ? 'monthly' : 'daily'} comparison
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              label={{ value: period === 'week' ? 'Week' : period === 'month' ? 'Month' : 'Day', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 11 }}
              label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fontSize: 11 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11 }}
              label={{ value: 'Change %', angle: 90, position: 'insideRight', fontSize: 11 }}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                      <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{`Date: ${payload[0].payload.date}`}</p>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">{`Current: ${payload[0].value} min`}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{`Previous: ${payload[0].payload.previousTotalTime} min`}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{`Change: ${payload[0].payload.change}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar 
              yAxisId="left"
              dataKey="totalTime" 
              fill="#8884d8" 
              name="Current Period"
            />
            <Bar 
              yAxisId="left"
              dataKey="previousTotalTime" 
              fill="#82ca9d" 
              name="Previous Period"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Average Time</p>
          <p className="text-sm font-semibold">
            {Math.round(transformedData.reduce((acc, curr) => acc + curr.totalTime, 0) / transformedData.length)} min
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Best Period</p>
          <p className="text-sm font-semibold">
            {Math.max(...transformedData.map(d => d.totalTime))} min
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Average Change</p>
          <p className="text-sm font-semibold">
            {Math.round(transformedData.reduce((acc, curr) => acc + Number(curr.change), 0) / (transformedData.length - 1))}%
          </p>
        </div>
      </div>
    </div>
  );
};

// PropTypes so the linter stops yelling at me
ComparisonChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    totalTime: PropTypes.number.isRequired,
    averageTime: PropTypes.number.isRequired,
    sessions: PropTypes.number.isRequired
  })).isRequired,
  period: PropTypes.oneOf(['day', 'week', 'month']).isRequired
};

export default ComparisonChart; 