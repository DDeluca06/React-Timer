import { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";
import BreakSettings from "./BreakSettings";
import SessionPlanner from "./SessionPlanner";
import ThemeCustomizer from "./ThemeCustomizer";
import DataManager from "./DataManager";

const SettingsPanel = () => {
    const { settings, updateSettings } = useContext(TimerContext);
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        // Update state when theme changes externally
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const handleThemeToggle = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode(!isDarkMode);
    };

    const handleSoundToggle = () => {
        updateSettings({ soundEnabled: !settings.soundEnabled });
    };

    const handleNotificationToggle = () => {
        updateSettings({ notificationsEnabled: !settings.notificationsEnabled });
    };

    const handleLongBreakIntervalChange = (value) => {
        const interval = parseInt(value, 10);
        if (isNaN(interval) || interval < 1 || interval > 10) return;
        
        updateSettings({ longBreakInterval: interval });
    };

    const handleTimerChange = (type, value) => {
        const minutes = parseInt(value, 10);
        if (isNaN(minutes) || minutes < 1 || minutes > 60) return;
        
        const seconds = minutes * 60;
        updateSettings({
            timerPresets: {
                ...settings.timerPresets,
                [type]: seconds
            }
        });
    };

    return (
        <div className="settings-panel p-6">
            <div className="space-y-8">
                {/* Timer Settings */}
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                        Timer Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-light-text dark:text-dark-text">
                                Pomodoro Length (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={settings.timerPresets.pomodoro / 60}
                                onChange={(e) => handleTimerChange('pomodoro', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                         bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-light-text dark:text-dark-text">
                                Short Break Length (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={settings.timerPresets.shortBreak / 60}
                                onChange={(e) => handleTimerChange('shortBreak', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                         bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-light-text dark:text-dark-text">
                                Long Break Length (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={settings.timerPresets.longBreak / 60}
                                onChange={(e) => handleTimerChange('longBreak', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                         bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-light-text dark:text-dark-text">
                                Long Break Interval
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={settings.longBreakInterval || 4}
                                onChange={(e) => handleLongBreakIntervalChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                         bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </section>

                {/* Break Settings */}
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <BreakSettings />
                </section>

                {/* Session Planning */}
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                        Session Planning
                    </h3>
                    <SessionPlanner />
                </section>

                {/* Theme Settings */}
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                                Theme Settings
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Customize the appearance of your timer application. Choose between light and dark modes, or create your own custom theme.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-light-text dark:text-dark-text">Theme Mode</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark mode</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Light</span>
                                        <button
                                            onClick={handleThemeToggle}
                                            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            aria-label="Toggle theme mode"
                                        >
                                            <span
                                                className={`absolute inset-0 rounded-full transition-colors ${
                                                    isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                                                }`}
                                            />
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Dark</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="font-medium text-light-text dark:text-dark-text mb-4">Custom Theme</h4>
                            <ThemeCustomizer />
                        </div>
                    </div>
                </section>

                {/* Notification Settings */}
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                        Notification Settings
                    </h3>
                    <div className="space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.soundEnabled}
                                onChange={handleSoundToggle}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-light-text dark:text-dark-text">Enable Sound</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notificationsEnabled}
                                onChange={handleNotificationToggle}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-light-text dark:text-dark-text">Enable Desktop Notifications</span>
                        </label>
                    </div>
                </section>

                {/* Data Management */}
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                        Data Management
                    </h3>
                    <DataManager />
                </section>
            </div>
        </div>
    );
};

export default SettingsPanel;