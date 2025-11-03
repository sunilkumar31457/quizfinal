import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, submitQuiz } from '../services/api';
import './QuizPlayer.css';

const QuizPlayer = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(quizId);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        alert('Failed to load quiz');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId, navigate]);

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      if (!window.confirm('You haven\'t answered all questions. Submit anyway?')) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await submitQuiz(quizId, answers);
      navigate('/quiz-results', { state: { result: response.data, quizTitle: quiz.title } });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container stack">
        <div className="card">
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container stack">
        <div className="card">
          <p>Quiz not found</p>
        </div>
      </div>
    );
  }

  const q = quiz.questions[index];
  const progress = Math.round(((index + 1) / quiz.questions.length) * 100);

  const choose = (i) => setAnswers({...answers, [q.id]: i});
  const next = () => setIndex(Math.min(index + 1, quiz.questions.length - 1));
  const prev = () => setIndex(Math.max(index - 1, 0));

  return (
    <div className="container stack">
      <header className="card">
        <div className="space-between">
          <div>
            <h1 className="title" style={{marginBottom:'.2rem'}}>{quiz.title}</h1>
            <p className="subtitle">Question {index + 1} of {quiz.questions.length}</p>
            {quiz.description && <p className="subtitle">{quiz.description}</p>}
          </div>
          <div className="badge">{progress}% complete</div>
        </div>
      </header>

      <section className="card stack">
        <h3 style={{margin:'0 0 .4rem 0'}}>{q.text}</h3>
        <div className="stack">
          {q.choices.map((c, i) => (
            <label key={i} className={`choice ${answers[q.id] === i ? 'active' : ''}`}>
              <input 
                type="radio" 
                name={`q-${q.id}`} 
                checked={answers[q.id] === i} 
                onChange={() => choose(i)} 
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
        <div className="row" style={{justifyContent:'space-between'}}>
          <button className="btn ghost" onClick={prev} disabled={index === 0}>
            Back
          </button>
          {index === quiz.questions.length - 1 ? (
            <button 
              className="btn" 
              onClick={handleSubmit} 
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button className="btn" onClick={next}>
              Next
            </button>
          )}
        </div>
      </section>

      <div className="card">
        <p className="subtitle">Answered: {Object.keys(answers).length} / {quiz.questions.length}</p>
      </div>
    </div>
  );
};

export default QuizPlayer;
