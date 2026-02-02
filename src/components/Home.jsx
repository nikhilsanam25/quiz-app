import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const subjects = [
    { name: 'Linux', icon: '🐧' },
    { name: 'DevOps', icon: '🚀' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Programming', icon: '💻' },
    { name: 'SQL', icon: '🗄️' },
  ];
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-mono flex flex-col items-center justify-center p-6">
      
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-400">
          <span className="text-white">&lt;</span>CodeQuiz
          <span className="text-white">/&gt;</span>
        </h1>
        <p className="text-lg text-slate-400 mb-8">
          console.log(
          <span className="text-yellow-300">"Welcome, Developer!"</span>);
        </p>
        <p className="text-slate-500">
          Test your knowledge across the stack. Select a topic and challenge
          yourself.
        </p>
      </div>

      {/* subjects */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 w-full max-w-4xl">
        {subjects.map((sub) => (
          <div
            key={sub.name}
            className="bg-slate-800 border border-slate-700 p-4 rounded-lg text-center hover:bg-slate-700 transition-all duration-300 hover:scale-105 cursor-default shadow-lg"
          >
            <div className="text-3xl mb-2">{sub.icon}</div>
            <h3 className="text-sm font-semibold text-green-300">{sub.name}</h3>
          </div>
        ))}
      </div>

      
      <Link
        to="/takequiz"
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-green-600 font-sans rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-slate-900"
      >
        <span>Initialize Quiz()</span>
        <svg
          className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>

      
      <div className="mt-16 text-slate-600 text-xs">
        <p>git commit -m "learned something new today"</p>
      </div>
    </div>
  );
}
