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
│  ├─ app.jsx
│  ├─ components
│  │  ├─ common
│  │  │  └─ Button.jsx
│  │  ├─ context
│  │  │  └─ TimerContext.jsx
│  │  ├─ hooks
│  │  │  └─ useTimer.jsx
│  │  ├─ timer
│  │  │  ├─ TimerControls.jsx
│  │  │  └─ TimerDisplay.jsx
│  │  ├─ ui
│  │  │  └─ Progress.jsx
│  │  └─ utils
│  │     └─ Time.jsx
│  ├─ index.css
│  └─ main.jsx
├─ tailwind.config.js
└─ vite.config.js
```