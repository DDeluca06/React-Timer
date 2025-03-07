import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const DataManager = () => {
    const { settings } = useContext(TimerContext);

    const exportData = (format) => {
        const data = {
            settings,
            sessionHistory: JSON.parse(localStorage.getItem('sessionHistory') || '[]'),
            statistics: JSON.parse(localStorage.getItem('statistics') || '{}'),
            templates: settings.sessionTemplates || []
        };

        let exportContent;
        let mimeType;
        let fileName;

        if (format === 'json') {
            exportContent = JSON.stringify(data, null, 2);
            mimeType = 'application/json';
            fileName = 'pomodoro-backup.json';
        } else if (format === 'csv') {
            // Convert session history to CSV format
            const headers = ['date', 'duration', 'type', 'completed'];
            const sessions = data.sessionHistory.map(session => 
                `${session.date},${session.duration},${session.type},${session.completed}`
            );
            exportContent = [headers.join(','), ...sessions].join('\n');
            mimeType = 'text/csv';
            fileName = 'pomodoro-sessions.csv';
        }

        const blob = new Blob([exportContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const importData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validate the imported data structure
                if (!data.settings || !data.sessionHistory || !data.statistics) {
                    throw new Error('Invalid backup file format');
                }

                // Restore the data
                localStorage.setItem('sessionHistory', JSON.stringify(data.sessionHistory));
                localStorage.setItem('statistics', JSON.stringify(data.statistics));
                localStorage.setItem('settings', JSON.stringify(data.settings));

                // Reload the page to apply imported settings
                window.location.reload();
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    const clearData = () => {
        if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6">
            {/* Export Options */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium">Export Data</h4>
                <div className="flex space-x-3">
                    <button
                        onClick={() => exportData('json')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Export as JSON
                    </button>
                    <button
                        onClick={() => exportData('csv')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Export Sessions as CSV
                    </button>
                </div>
            </div>

            {/* Import Options */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium">Import Data</h4>
                <div className="flex items-center space-x-3">
                    <input
                        type="file"
                        accept=".json"
                        onChange={importData}
                        className="hidden"
                        id="import-file"
                    />
                    <label
                        htmlFor="import-file"
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer"
                    >
                        Import Backup
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Only .json backup files are supported
                    </p>
                </div>
            </div>

            {/* Data Management */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium">Data Management</h4>
                <button
                    onClick={clearData}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Clear All Data
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    This will remove all settings, history, and statistics
                </p>
            </div>
        </div>
    );
};

export default DataManager; 