import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterControls = ({ dateRange, onDateRangeChange, comparisonPeriod, onComparisonPeriodChange }) => {
  return (
    <div className="filter-controls bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Date Range Selection */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <div className="flex gap-2 items-center">
            {/* Start Date Picker */}
            <DatePicker
              selected={dateRange.start}
              onChange={(date) => onDateRangeChange({ ...dateRange, start: date })}
              selectsStart
              startDate={dateRange.start}
              endDate={dateRange.end}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholderText="Start Date"
            />
            <span>to</span>
            {/* End Date Picker */}
            <DatePicker
              selected={dateRange.end}
              onChange={(date) => onDateRangeChange({ ...dateRange, end: date })}
              selectsEnd
              startDate={dateRange.start}
              endDate={dateRange.end}
              minDate={dateRange.start}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholderText="End Date"
            />
          </div>
        </div>

        {/* Comparison Period Selection */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Comparison Period</label>
          <select
            value={comparisonPeriod}
            onChange={(e) => onComparisonPeriodChange(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Quick Filters</label>
          <div className="flex gap-2">
            {/* Filter for the last 7 days */}
            <button
              onClick={() => {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 7);
                onDateRangeChange({ start, end });
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            >
              Last 7 Days
            </button>
            {/* Last 30 Days */}
            <button
              onClick={() => {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 30);
                onDateRangeChange({ start, end });
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            >
              Last 30 Days
            </button>
            {/* Current Month */}
            <button
              onClick={() => {
                const end = new Date();
                const start = new Date();
                start.setDate(1); // First day of current month
                onDateRangeChange({ start, end });
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            >
              This Month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes so the linter stops yelling at me
FilterControls.propTypes = {
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
  }).isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  comparisonPeriod: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  onComparisonPeriodChange: PropTypes.func.isRequired
};

export default FilterControls; 