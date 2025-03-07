import { useState } from 'react';
import { useTheme } from '../../components/context/ThemeContext';

const ThemeCustomizer = () => {
    const { theme, updateTheme } = useTheme();
    const [customTheme, setCustomTheme] = useState(theme);

    const handleColorChange = (colorKey, value) => {
        const updatedTheme = { ...customTheme, [colorKey]: value };
        setCustomTheme(updatedTheme);
        updateTheme(updatedTheme);
    };

    const presetThemes = [
        { name: 'Classic', colors: { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#10B981', text: '#111827', background: '#F3F4F6' } },
        { name: 'Dark', colors: { primary: '#6366F1', secondary: '#111827', accent: '#8B5CF6', text: '#F9FAFB', background: '#1F2937' } },
        { name: 'Nature', colors: { primary: '#059669', secondary: '#065F46', accent: '#10B981', text: '#064E3B', background: '#ECFDF5' } }
    ];

    return (
        <div className="space-y-6 mt-4">
            {/* Color Customization */}
            <div className="space-y-4">
                <div className="color-picker">
                    <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
                        Primary Color
                    </label>
                    <input
                        type="color"
                        value={theme.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-full h-10 rounded-lg cursor-pointer"
                    />
                </div>
                
                <div className="color-picker">
                    <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
                        Secondary Color
                    </label>
                    <input
                        type="color"
                        value={theme.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-full h-10 rounded-lg cursor-pointer"
                    />
                </div>
            </div>

            {/* Preset Themes */}
            <div>
                <h4 className="text-sm font-medium mb-3 text-light-text dark:text-dark-text">Preset Themes</h4>
                <div className="grid grid-cols-3 gap-3">
                    {presetThemes.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => {
                                setCustomTheme(preset.colors);
                                updateTheme(preset.colors);
                            }}
                            className="p-3 border rounded-md bg-light-card dark:bg-dark-card 
                                     hover:bg-light-bg dark:hover:bg-dark-bg 
                                     text-light-text dark:text-dark-text
                                     border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex space-x-1 mb-2">
                                <div style={{ backgroundColor: preset.colors.primary }} className="w-4 h-4 rounded-full" />
                                <div style={{ backgroundColor: preset.colors.secondary }} className="w-4 h-4 rounded-full" />
                                <div style={{ backgroundColor: preset.colors.accent }} className="w-4 h-4 rounded-full" />
                            </div>
                            <span className="text-sm font-medium">{preset.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div>
                <h4 className="text-sm font-medium mb-3 text-light-text dark:text-dark-text">Theme Preview</h4>
                <div className="p-4 rounded-lg bg-light-card dark:bg-dark-card">
                    <button className="px-4 py-2 rounded-md mr-2" style={{ backgroundColor: customTheme.primary, color: '#ffffff' }}>
                        Primary Button
                    </button>
                    <button className="px-4 py-2 rounded-md mr-2" style={{ backgroundColor: customTheme.secondary, color: '#ffffff' }}>
                        Secondary Button
                    </button>
                    <button className="px-4 py-2 rounded-md" style={{ backgroundColor: customTheme.accent, color: '#ffffff' }}>
                        Accent Button
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeCustomizer; 