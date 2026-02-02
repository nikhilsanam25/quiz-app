import React, { useState, useEffect } from 'react';

export default function Results() {
  const [quizResults, setQuizResults] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  useEffect(() => {
    function loadResults() {
      const savedResults = localStorage.getItem('quizResults');
      if (savedResults) {
        const results = JSON.parse(savedResults);
        setQuizResults(results);
      } else {
        setQuizResults([]);
      }
    }
    loadResults();
  }, []);

function toggleDetails(quizId) {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  }
 
function clearHistory() {
    localStorage.removeItem('quizResults');
    setQuizResults([]);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Modified header to include Clear History button */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Quiz Results</h2>
        {quizResults.length > 0 && (
          <button 
            onClick={clearHistory}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition shadow-sm"
          >
            Clear History
          </button>
        )}
      </div>

      {quizResults.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-200">
          <p className="text-xl text-gray-500">No quiz attempts.</p>
        </div>
      )}

      {quizResults.length > 0 && (
        <div className="space-y-6">
          {quizResults.map((result, index) => {
            const isExpanded = expandedQuiz === result.id;

            return (
              <div key={result.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Quiz {index + 1}</h3>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p><span className="font-semibold">Score:</span> {result.score} / {result.total}</p>
                      <p className="capitalize"><span className="font-semibold">Category:</span> {result.category}</p>
                      <p className="capitalize"><span className="font-semibold">Difficulty:</span> {result.difficulty}</p>
                      <p className="text-sm text-gray-400">{result.date}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggleDetails(result.id)}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-sm font-medium w-full md:w-auto"
                  >
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {isExpanded && (
                  <div className="bg-gray-50 p-6 border-t border-gray-200">
                    {result.wrongAnswers.length === 0 && (
                      <p className="text-green-600 font-bold text-center text-lg">
                        🎉 Perfect score! No wrong answers.
                      </p>
                    )}

                    {result.wrongAnswers.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-red-600 mb-4">Wrong Answers:</h4>
                        <div className="space-y-6">
                          {result.wrongAnswers.map((item, idx) => {
                            let userAnswerText = 'No answer';
                            if (item.userAnswer.length > 0) {
                              userAnswerText = item.userAnswer.join(', ');
                            }

                            const correctAnswerText = item.correctAnswer.join(', ');

                            return (
                              <div key={idx} className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                                <p className="mb-3 text-gray-800">
                                  <strong className="text-gray-900">Question:</strong> {item.question}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                  <div className="bg-red-50 p-3 rounded border border-red-100">
                                    <p className="text-sm font-bold text-red-700">Your Answer:</p>
                                    <p className="text-red-600">{userAnswerText}</p>
                                  </div>
                                  <div className="bg-green-50 p-3 rounded border border-green-100">
                                    <p className="text-sm font-bold text-green-700">Correct Answer:</p>
                                    <p className="text-green-600">{correctAnswerText}</p>
                                  </div>
                                </div>

                                <div className="text-gray-600 text-sm bg-gray-100 p-3 rounded">
                                  <strong>Explanation:</strong> {item.explanation}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
