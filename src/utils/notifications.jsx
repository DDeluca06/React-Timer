import { toast } from 'react-toastify';

// Simple utility to check if notifications are enabled in settings
const getNotificationsEnabled = () => {
  const settings = localStorage.getItem('settings');
  if (!settings) return true; // Default to enabled if no settings found
  
  try {
    const parsedSettings = JSON.parse(settings);
    return parsedSettings.notificationsEnabled !== false; // Default to true if property doesn't exist
  } catch (e) {
    console.error('Error parsing settings:', e);
    return true; // Default to enabled on error
  }
};

// Check user preferences and show toast notifications if enabled
export const showToast = {
  success: (message, options = {}) => {
    if (getNotificationsEnabled()) {
      toast.success(message, options);
    }
    // debugging
    console.log(`Success: ${message}`);
  },
  
  info: (message, options = {}) => {
    if (getNotificationsEnabled()) {
      toast.info(message, options);
    }
    console.log(`Info: ${message}`);
  },
  
  warning: (message, options = {}) => {
    if (getNotificationsEnabled()) {
      toast.warning(message, options);
    }
    console.log(`Warning: ${message}`);
  },
  
  error: (message, options = {}) => {
    if (getNotificationsEnabled()) {
      toast.error(message, options);
    }
    console.log(`Error: ${message}`);
  }
}; 