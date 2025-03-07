/* --------------------------------- IMPORTS -------------------------------- */
import './App.css';
import { TimerProvider } from './context/TimerContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Settings from './pages/Settings.jsx';
import Stats from './pages/Statistics.jsx';
import AchievementsPage from './pages/Achievements.jsx';
import 'react-toastify/dist/ReactToastify.css';
/* --------------------------------- IMPORTS -------------------------------- */

/* ----------------------------------- APP ---------------------------------- */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TimerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
            />
          </BrowserRouter>
        </TimerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
/* ----------------------------------- APP ---------------------------------- */

export default App;