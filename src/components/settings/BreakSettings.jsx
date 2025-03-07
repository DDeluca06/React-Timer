import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';

const BreakSettings = () => {
  const { settings, updateSettings } = useContext(TimerContext);

  const handleAllowSkipBreaksChange = (e) => {
    updateSettings({
      ...settings,
      allowSkipBreaks: e.target.checked
    });
  };

  const handleAutoStartPomodorosChange = (e) => {
    updateSettings({
      ...settings,
      autoStartPomodoros: e.target.checked
    });
  };

  return (
    <div className="break-settings mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Break Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="setting-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowSkipBreaks}
              onChange={handleAllowSkipBreaksChange}
              className="form-checkbox h-5 w-5 mt-1 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="font-medium block mb-1">Skip Breaks</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable option to skip breaks and continue working
              </p>
            </div>
          </label>
        </div>

        <div className="setting-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoStartPomodoros}
              onChange={handleAutoStartPomodorosChange}
              className="form-checkbox h-5 w-5 mt-1 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="font-medium block mb-1">Auto-start Focus</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically start next focus session after break
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BreakSettings; 