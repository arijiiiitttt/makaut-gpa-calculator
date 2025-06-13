import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Main/HomePage';
import Doc from './pages/Doc';
import Footer from './components/Footer';
import SelectionPg from './pages/SelectionPg';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
            <HomePage/>
            </>
          }
        />
        <Route path="/doc" element={<Doc/>} />
        <Route path="/selection" element={<SelectionPg/>} />
      </Routes> 
      <Footer/>
    </Router>
  );
}

export default App;
