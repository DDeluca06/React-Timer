import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import BreakSettings from "./BreakSettings";
import SessionPlanner from "./SessionPlanner";
import ThemeCustomizer from "./ThemeCustomizer";
import DataManager from "./DataManager";

const SettingsPanel = () => {
    const { settings, updateSettings } = useContext(TimerContext);

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
            
            <div className="space-y-6">
                {/* Timer Settings */}
                <div className="timer-settings">
                    <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="timer-input">
                            <label className="block text-sm font-medium mb-2">
                                Pomodoro Length (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={settings.timerPresets.pomodoro / 60}
                                onChange={(e) => handleTimerChange('pomodoro', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="timer-input">
                            <label className="block text-sm font-medium mb-2">
                                Short Break Length (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={settings.timerPresets.shortBreak / 60}
                                onChange={(e) => handleTimerChange('shortBreak', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="timer-input">
                            <label className="block text-sm font-medium mb-2">
                                Long Break Length (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={settings.timerPresets.longBreak / 60}
                                onChange={(e) => handleTimerChange('longBreak', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="timer-input">
                            <label className="block text-sm font-medium mb-2">
                                Long Break Interval
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={settings.longBreakInterval || 4}
                                onChange={(e) => handleLongBreakIntervalChange(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Break Settings */}
                <BreakSettings />

                {/* Session Planning */}
                <div className="session-planning">
                    <h3 className="text-lg font-semibold mb-4">Session Planning</h3>
                    <SessionPlanner />
                </div>

                {/* Theme Settings */}
                <div className="theme-settings">
                    <h3 className="text-lg font-semibold mb-4">Theme Customization</h3>
                    <ThemeSwitcher />
                    <ThemeCustomizer />
                </div>

                {/* Data Management */}
                <div className="data-management">
                    <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                    <DataManager />
                </div>

                {/* Notification Settings */}
                <div className="notification-settings">
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.soundEnabled}
                                onChange={handleSoundToggle}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span>Enable Sound</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notificationsEnabled}
                                onChange={handleNotificationToggle}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span>Enable Desktop Notifications</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;