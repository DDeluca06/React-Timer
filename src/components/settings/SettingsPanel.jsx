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

    return (
        <div className="p-4 bg-gray-100 rounded-lg space-y-6">
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