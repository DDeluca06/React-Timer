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
Timer
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ components
│  │  ├─ analytics
│  │  │  ├─ SessionStats.jsx
│  │  │  └─ StreakCounter.jsx
│  │  ├─ common
│  │  │  └─ Button.jsx
│  │  ├─ context
│  │  │  └─ TimerContext.jsx
│  │  ├─ ErrorBoundary.jsx
│  │  ├─ settings
│  │  │  └─ SettingsPanel.jsx
│  │  ├─ timer
│  │  │  ├─ TimerControls.jsx
│  │  │  └─ TimerDisplay.jsx
│  │  └─ ui
│  │     ├─ Footer.jsx
│  │     ├─ NavBar.css
│  │     ├─ NavBar.jsx
│  │     ├─ Progress.jsx
│  │     └─ ThemeSwitcher.jsx
│  ├─ hooks
│  │  ├─ Time.jsx
│  │  ├─ useAnalytics.jsx
│  │  ├─ useBreaks.jsx
│  │  ├─ usePersistence.jsx
│  │  ├─ useSessions.jsx
│  │  ├─ useTimerContext.jsx
│  │  └─ useTimerLogic.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ pages
│     ├─ About.jsx
│     ├─ Home.jsx
│     ├─ Settings.jsx
│     └─ Statistics.jsx
├─ tailwind.config.js
└─ vite.config.js

```
```
Timer
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ components
│  │  ├─ analytics
│  │  │  ├─ SessionStats.jsx
│  │  │  └─ StreakCounter.jsx
│  │  ├─ common
│  │  │  └─ Button.jsx
│  │  ├─ context
│  │  │  └─ TimerContext.jsx
│  │  ├─ ErrorBoundary.jsx
│  │  ├─ settings
│  │  │  └─ SettingsPanel.jsx
│  │  ├─ timer
│  │  │  ├─ AchievementsList.jsx
│  │  │  ├─ TimerControls.jsx
│  │  │  └─ TimerDisplay.jsx
│  │  └─ ui
│  │     ├─ Footer.jsx
│  │     ├─ NavBar.css
│  │     ├─ NavBar.jsx
│  │     ├─ Progress.jsx
│  │     └─ ThemeSwitcher.jsx
│  ├─ data
│  │  └─ achievements.js
│  ├─ hooks
│  │  ├─ Time.jsx
│  │  ├─ useAnalytics.jsx
│  │  ├─ useBreaks.jsx
│  │  ├─ usePersistence.jsx
│  │  ├─ useSessions.jsx
│  │  ├─ useTimerContext.jsx
│  │  └─ useTimerLogic.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ About.jsx
│  │  ├─ Achievements.jsx
│  │  ├─ Home.jsx
│  │  ├─ Settings.jsx
│  │  └─ Statistics.jsx
│  └─ utils
│     ├─ Achievements.jsx
│     └─ Storage.jsx
├─ tailwind.config.js
└─ vite.config.js

```