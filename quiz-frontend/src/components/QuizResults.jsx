import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './QuizResults.css';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, quizTitle } = location.state || {};

  if (!result) {
    return (
      <div className="center">
        <div className="card" style={{maxWidth:520,width:'100%', padding:'2rem'}}>
          <h1 className="title" style={{textAlign:'center'}}>No Results</h1>
          <p className="subtitle" style={{textAlign:'center'}}>Please take a quiz first</p>
          <div className="row" style={{justifyContent:'center'}}>
            <Link className="btn" to="/dashboard">Back to dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const score = result.score;
  const total = result.totalQuestions;
  const percentage = result.percentage;

  return (
    <div className="center">
      <div className="card" style={{maxWidth:520,width:'100%', padding:'2rem'}}>
        <h1 className="title" style={{textAlign:'center'}}>Your results</h1>
        <h2 className="subtitle" style={{textAlign:'center'}}>{quizTitle}</h2>
        <p className="subtitle" style={{textAlign:'center'}}>
          {percentage >= 80 ? 'Excellent! 🎉' : percentage >= 60 ? 'Good job! 👍' : 'Keep practicing! 💪'}
        </p>
        <div className="row" style={{justifyContent:'center', gap:'1rem', margin:'1rem 0 1.4rem 0'}}>
          <div className="badge">Score: {score}/{total}</div>
          <div className="badge">Accuracy: {percentage}%</div>
        </div>
        <div className="row" style={{justifyContent:'center', gap:'1rem'}}>
          <Link className="btn" to="/dashboard">Back to dashboard</Link>
          <Link className="btn secondary" to="/create-quiz">Create Quiz</Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
