import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { MainPage, FullInfoPage } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
      
        <Route path="/" element={<MainPage />} />
        <Route path="/full-info/:id" element={<FullInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
