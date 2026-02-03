import React, { useState } from 'react';

export default function TakeQuiz() {
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState('linux');
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const API_KEY = 'gBytFD4fk9FHPLMXt35R9dluLKa2erIsElkfXogA';

  async function fetchQuiz() {
    setQuestions([]);
    setUserAnswers({});

    const url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=${limit}&category=${category}&difficulty=${difficulty}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      alert('Error fetching quiz: ' + error.message);
      console.log('Fetch error:', error);
    }
  }

  function handleOptionChange(questionId, answerKey) {
    setUserAnswers({ ...userAnswers, [questionId]: [answerKey] });
  }

  function submitQuiz(e) {
    e.preventDefault();

    let score = 0;
    const wrongAnswers = [];

    
    for (let i = 0; i < questions.length; i++) {    // Check each question
      const question = questions[i];
      const selectedAnswers = userAnswers[question.id] || [];

      
      const correctAnswers = [];              // Find correct answers
      const correctAnswersObj = question.correct_answers;

      for (let key in correctAnswersObj) {
        if (correctAnswersObj[key] === 'true') {
          const answerKey = key.replace('_correct', '');
          correctAnswers.push(answerKey);
        }
      }

      
      let isCorrect = true;      // Checking if answer is correct

      if (selectedAnswers.length !== correctAnswers.length) {
        isCorrect = false;
      } else {
        for (let j = 0; j < selectedAnswers.length; j++) {
          if (!correctAnswers.includes(selectedAnswers[j])) {
            isCorrect = false;
            break;
          }
        }
      }

      if (isCorrect) {
        score = score + 1;
      } else {
       
        const userAnswerTexts = [];      // Storing wrong answers
        for (let k = 0; k < selectedAnswers.length; k++) {
          const answerText = question.answers[selectedAnswers[k]];
          if (answerText) {
            userAnswerTexts.push(answerText);
          }
        }

        const correctAnswerTexts = [];
        for (let k = 0; k < correctAnswers.length; k++) {
          const answerText = question.answers[correctAnswers[k]];
          if (answerText) {
            correctAnswerTexts.push(answerText);
          }
        }

        wrongAnswers.push({
          question: question.question,
          userAnswer: userAnswerTexts,
          correctAnswer: correctAnswerTexts,
          explanation: question.explanation || 'No explanation available',
        });
      }
    }

    
    function getSavedResults() {
      const savedResults = localStorage.getItem('quizResults');
      let allResults = [];

      if (savedResults) {
        allResults = JSON.parse(savedResults);
      }
      return allResults;
    }

    function createNewResult() {
      const newResult = {
        id: Date.now(),
        score: score,
        total: questions.length,
        category: category,
        difficulty: difficulty,
        wrongAnswers: wrongAnswers,
        date: new Date().toLocaleString(),
      };
      return newResult;
    }

    const allResults = getSavedResults();
    const newResult = createNewResult();

    allResults.push(newResult);
    localStorage.setItem('quizResults', JSON.stringify(allResults));

   
    alert(`Quiz Finished! Score: ${score} / ${questions.length}`);

   
    setQuestions([]);
    setUserAnswers({});
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Questions:
          </label>
          <input
            type="number"
            name="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full sm:w-24 focus:outline-none focus:border-blue-500"
            placeholder="Qty"
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Topic:
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full sm:w-auto focus:outline-none focus:border-blue-500"
          >
            <option value="linux">Linux</option>
            <option value="devops">DevOps</option>
            <option value="docker">Docker</option>
            <option value="code">Programming</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Difficulty Level:
          </label>
          <select
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full sm:w-auto focus:outline-none focus:border-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="w-full sm:w-auto mt-6 sm:mt-0">
          <button
            onClick={fetchQuiz}
            disabled={questions.length > 0}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition w-full sm:w-auto font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Quiz
          </button>
        </div>
      </div>

      <hr className="mb-8 border-gray-300" />

      <form onSubmit={submitQuiz}>
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
            <p className="mb-4 text-lg text-gray-800">
              <strong className="text-blue-600 mr-2">
                {index + 1}.
              </strong> 
              {question.question}
            </p>

            <div className="space-y-2 pl-4">
              {Object.entries(question.answers).map(([key, value]) => {
                if (!value) return null;

                const isChecked = userAnswers[question.id]?.includes(key) || false;

                return (
                  <div key={key} className="flex items-center">
                    <input
                      type="radio"
                      id={`${question.id}-${key}`}
                      name={`question-${question.id}`}
                      checked={isChecked}
                      onChange={() => handleOptionChange(question.id, key)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                    />
                    <label 
                      htmlFor={`${question.id}-${key}`} 
                      className="text-gray-700 cursor-pointer hover:text-gray-900"
                    >
                      {value}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {questions.length > 0 && (
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md"
          >
            Submit Quiz
          </button>
        )}
      </form>
    </div>
  );
}
