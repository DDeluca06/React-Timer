# React Focus Timer

A modern, feature-rich Pomodoro timer application built with React. This application helps users maintain focus and productivity through timed work sessions and breaks.

## Features
- Customizable focus timer (default 25 minutes)
- Timer controls (Start, Pause, Reset)
- Visual progress tracking with dynamic progress bar
- Session statistics and streak tracking
- Break management system
- Toast notifications for session updates and milestones
- Dark/Light theme support
- Persistent settings and session data
- Mobile-responsive design

## Core Technologies
- React 18
- Tailwind CSS for styling
- Vite for build tooling
- Material-UI components
- React Router for navigation
- React Toastify for notifications

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-focus-timer.git
   ```
2. Navigate to project directory:
   ```bash
   cd react-focus-timer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser

## Key Features in Development
- Achievement system
- Enhanced statistics dashboard
- Custom timer presets
- Sound notifications

## Structure
```
Timer/
├─ .gitignore
├─ eslint.config.js               
├─ index.html                     
├─ package-lock.json             
├─ package.json                  
├─ postcss.config.js            
├─ public/                      # Static assets directory
│  └─ vite.svg                 
├─ README.md                   # You Are Here
├─ src/                       # Source code directory
│  ├─ App.css                
│  ├─ App.jsx               # Root application component
│  ├─ components/          
│  │  ├─ analytics/       
│  │  │  ├─ SessionStats.jsx    # Displays session statistics
│  │  │  └─ StreakCounter.jsx   # Shows current streak count
│  │  ├─ common/              
│  │  │  └─ Button.jsx        
│  │  ├─ context/            
│  │  │  └─ TimerContext.jsx # Timer state management context
│  │  ├─ ErrorBoundary.jsx  # Error handling component
│  │  ├─ settings/         
│  │  │  └─ SettingsPanel.jsx # User settings interface
│  │  ├─ timer/          
│  │  │  ├─ AchievementsList.jsx # Lists user achievements
│  │  │  ├─ TimerControls.jsx    # Timer control buttons
│  │  │  ├─ TimerDisplay.jsx     # Displays current timer
│  │  │  └─ TimerModeSelector.jsx # Timer mode selection
│  │  └─ ui/                    
│  │     ├─ Footer.jsx         # Application footer
│  │     ├─ NavBar.css         # Navigation bar styles
│  │     ├─ NavBar.jsx         # Navigation bar component
│  │     ├─ Progress.jsx       # Progress bar component (MUI)
│  │     └─ ThemeSwitcher.jsx  # Theme toggle component
│  ├─ data/                   
│  │  └─ achievements.js     # Achievement definitions
│  ├─ hooks/                
│  │  ├─ useAnalytics.jsx  # Analytics tracking hook
│  │  ├─ useBreaks.jsx     # Break management hook
│  │  ├─ usePersistence.jsx # Data persistence hook
│  │  ├─ useSessions.jsx    # Session management hook
│  │  ├─ useTime.jsx        # Time formatting hook
│  │  ├─ useTimerContext.jsx # Timer context hook
│  │  └─ useTimerLogic.jsx   # Timer logic hook
│  ├─ index.css              
│  ├─ main.jsx              
│  ├─ pages/               
│  │  ├─ About.jsx        
│  │  ├─ Achievements.jsx 
│  │  ├─ Home.jsx        
│  │  ├─ Settings.jsx    
│  │  └─ Statistics.jsx  
│  └─ utils/            
│     ├─ Achievements.jsx # Achievement handling
│     ├─ Notifications.jsx # Notification handling based on user preference
│     └─ Storage.jsx      # localStorage operations and handling
├─ tailwind.config.js    
└─ vite.config.js       

```