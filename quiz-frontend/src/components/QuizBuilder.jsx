import React, { useState } from 'react';

function QuizBuilder({ navigateTo }) {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const handleQuizChange = (e) => {
    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      [e.target.name]: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions
    });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, currentQuestion]
    });
    setCurrentQuestion({
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const saveQuiz = (e) => {
    e.preventDefault();
    // Here you would typically save the quiz to your backend
    console.log('Saving quiz:', quiz);
    navigateTo('dashboard');
  };

  return (
    <div className="quiz-builder">
      <h1>Create New Quiz</h1>
      <form onSubmit={saveQuiz}>
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={handleQuizChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Quiz Description"
          value={quiz.description}
          onChange={handleQuizChange}
          required
        />

        <div className="question-container">
          <h3>Add Question</h3>
          <input
            type="text"
            name="text"
            placeholder="Question Text"
            value={currentQuestion.text}
            onChange={handleQuestionChange}
            required
          />
          <select
            name="type"
            value={currentQuestion.type}
            onChange={handleQuestionChange}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="open-ended">Open Ended</option>
          </select>

          {currentQuestion.type === 'multiple-choice' && (
            <>
              {currentQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              ))}
              <select
                value={currentQuestion.correctAnswer}
                onChange={(e) => setCurrentQuestion({
                  ...currentQuestion,
                  correctAnswer: parseInt(e.target.value)
                })}
              >
                {currentQuestion.options.map((_, index) => (
                  <option key={index} value={index}>
                    Correct Answer: Option {index + 1}
                  </option>
                ))}
              </select>
            </>
          )}

          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
        </div>

        <button type="submit">Save Quiz</button>
      </form>

      <div>
        <h2>Questions ({quiz.questions.length})</h2>
        {quiz.questions.map((question, index) => (
          <div key={index} className="question-container">
            <h3>Question {index + 1}</h3>
            <p>{question.text}</p>
            {question.type === 'multiple-choice' && (
              <ul>
                {question.options.map((option, i) => (
                  <li key={i}>
                    {option} {i === question.correctAnswer && '(Correct)'}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizBuilder; 