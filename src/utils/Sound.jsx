// Create audio instance
let timerSound = null;

// Initialize sound on demand to avoid autoplay restrictions
const initializeSound = () => {
    if (!timerSound) {
        timerSound = new Audio('/audio/timer-complete.mp3');
        // Preload the audio file
        timerSound.load();
    }
};

export const playTimerComplete = () => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    
    if (settings.soundEnabled) {
        try {
            // Initialize sound if not already done
            if (!timerSound) {
                initializeSound();
            }
            
            // Reset and play
            timerSound.currentTime = 0;
            
            // Use promise-based play with proper error handling
            const playPromise = timerSound.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Playback started successfully
                    })
                    .catch(error => {
                        console.warn('Could not play timer sound:', error);
                    });
            }
        } catch (error) {
            console.warn('Error playing timer sound:', error);
        }
    }
}; 