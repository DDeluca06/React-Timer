/* --------------------------------- IMPORTS -------------------------------- */
import './App.css';
import { TimerProvider } from './components/context/TimerContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Settings from './pages/Settings.jsx';
import Stats from './pages/Statistics.jsx';
/* --------------------------------- IMPORTS -------------------------------- */

/* ----------------------------------- APP ---------------------------------- */
function App() {
  return (
    <TimerProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/stats" element={<Stats />} />
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
  );
}
/* ----------------------------------- APP ---------------------------------- */

export default App;