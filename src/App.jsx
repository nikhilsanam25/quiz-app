import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import TakeQuiz from './components/TakeQuiz.jsx';
import Results from './components/Results.jsx';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/takequiz' element={<TakeQuiz/>}/>
          <Route path='/results' element={<Results/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
