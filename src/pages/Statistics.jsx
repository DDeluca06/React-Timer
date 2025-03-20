import React from 'react';
import NavBar from '../components/ui/NavBar';
import Statistics from '../components/Statistics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Stats() {
  return (
    <div className="page-container max-w-7xl mx-auto">
      <NavBar />
      <Statistics />
      <ToastContainer />
    </div>
  );
}

export default Stats;