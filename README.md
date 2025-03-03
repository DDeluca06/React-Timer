# React Focus Timer
This is a simple timer application built with React. It allows you to start a timer.

## Features
- Start a 25 minute timer.
- Reset & Stop/Pause timer.
- Progress Bar.

## Technologies Used
- React
- Tailwind CSS
- Vite

## Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

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
