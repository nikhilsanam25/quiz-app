import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white font-mono border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          
          <div>
            <Link to="/" className="text-2xl font-bold text-green-400">
              &lt;CodeQuiz/&gt;
            </Link>
          </div>

          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-green-400">Home</Link>
            <Link to="/takequiz" className="hover:text-green-400">Take Quiz</Link>
            <Link to="/results" className="hover:text-green-400">View Results</Link>
          </div>

          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="focus:outline-none"
            >
              
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <Link to="/" className="block py-2 hover:text-green-400">Home</Link>
          <Link to="/takequiz" className="block py-2 hover:text-green-400">Take Quiz</Link>
          <Link to="/results" className="block py-2 hover:text-green-400">View Results</Link>
        </div>
      )}
    </nav>
  );
}
