import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";
import ThemeSwitcher from "../ui/ThemeSwitcher";

const SettingsPanel = () => {
    const { settings, updateSettings } = useContext(TimerContext);

    const handleSoundToggle = () => {
        updateSettings({ soundEnabled: !settings.soundEnabled });
    };

    const handleNotificationToggle = () => {
        updateSettings({ notificationsEnabled: !settings.notificationsEnabled });
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

    // Convert seconds to minutes for display
    const minutesValue = (type) => Math.floor(settings.timerPresets[type] / 60);

    return (
        <div className="p-4 bg-gray-100 rounded-lg space-y-6">
            {/* Timer Duration Controls */}
            <div className="space-y-4">
                <h3 className="font-medium text-lg">Timer Settings</h3>
                
                <div className="space-y-2">
                    <label className="block">
                        <span className="block mb-1">Pomodoro Duration (minutes)</span>
                        <input 
                            type="number" 
                            min="1" 
                            max="60" 
                            value={minutesValue('pomodoro')} 
                            onChange={(e) => handleTimerChange('pomodoro', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </label>
                </div>
                
                <div className="space-y-2">
                    <label className="block">
                        <span className="block mb-1">Short Break Duration (minutes)</span>
                        <input 
                            type="number" 
                            min="1" 
                            max="60" 
                            value={minutesValue('shortBreak')} 
                            onChange={(e) => handleTimerChange('shortBreak', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </label>
                </div>
                
                <div className="space-y-2">
                    <label className="block">
                        <span className="block mb-1">Long Break Duration (minutes)</span>
                        <input 
                            type="number" 
                            min="1" 
                            max="60" 
                            value={minutesValue('longBreak')} 
                            onChange={(e) => handleTimerChange('longBreak', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </label>
                </div>
            </div>

            <hr />

            {/* Sound Toggle */}
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={settings.soundEnabled} onChange={handleSoundToggle} />
                    <span>Enable Sound</span>
                </label>
            </div>
  
            {/* Notification Toggle */}
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={settings.notificationsEnabled} onChange={handleNotificationToggle} />
                    <span>Enable Notifications</span>
                </label>
            </div>
        
            <div>
                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default SettingsPanel;