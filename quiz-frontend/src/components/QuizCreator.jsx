import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../services/api';
import './QuizCreator.css';

const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

const emptyQuestion = () => ({
  id: makeId(),
  text: '',
  choices: [
    { id: makeId(), text: '' },
    { id: makeId(), text: '' },
    { id: makeId(), text: '' },
    { id: makeId(), text: '' },
  ],
  correct: 0,
});

const QuizCreator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addQuestion = () => setQuestions(prev => [...prev, emptyQuestion()]);

  const removeQuestion = (qId) => {
    setQuestions(prev => prev.filter(q => q.id !== qId));
  };

  const updateQuestion = (qId, patch) => {
    setQuestions(prev =>
      prev.map(q => (q.id === qId ? { ...q, ...patch } : q))
    );
  };

  const updateChoice = (qId, choiceId, value) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== qId) return q;
        const choices = q.choices.map(c => (c.id === choiceId ? { ...c, text: value } : c));
        return { ...q, choices };
      })
    );
  };

  const save = async () => {
    if (!title.trim()) {
      alert('Please enter a quiz title.');
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        alert(`Question ${i + 1} needs text.`);
        return;
      }
      const nonEmptyChoices = q.choices.filter(c => c.text.trim());
      if (nonEmptyChoices.length < 2) {
        alert(`Question ${i + 1} needs at least 2 choices.`);
        return;
      }
      if (q.correct < 0 || q.correct >= q.choices.length || !q.choices[q.correct].text.trim()) {
        alert(`Please set a valid correct choice for question ${i + 1}.`);
        return;
      }
    }

    const payload = {
      title,
      description,
      questions: questions.map(q => ({
        text: q.text,
        choices: q.choices.map(c => c.text),
        correct: q.correct,
      })),
    };

    setLoading(true);
    try {
      await createQuiz(payload);
      alert('Quiz saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container stack">
      <header className="card">
        <h1 className="title" style={{ marginBottom: '.2rem' }}>Create a quiz</h1>
        <p className="subtitle">Add a title, description and your questions.</p>
      </header>

      <section className="card stack">
        <div className="stack">
          <label className="label">Title</label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. JavaScript Basics"
          />
        </div>

        <div className="stack">
          <label className="label">Description</label>
          <textarea
            className="input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this quiz about?"
          />
        </div>
      </section>

      {questions.map((q, i) => (
        <section key={q.id} className="card stack">
          <div className="row space-between" style={{ alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Question {i + 1}</h3>
            <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
              <span className="badge">{q.choices.filter(c => c.text.trim()).length}/4 choices</span>
              {questions.length > 1 && (
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => removeQuestion(q.id)}
                  title="Remove question"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <input
            className="input"
            value={q.text}
            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
            placeholder="Write the question"
          />

          <div className="grid grid-2">
            {q.choices.map((c, idx) => (
              <div className="stack" key={c.id}>
                <label className="row" style={{ gap: '.5rem', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name={`correct-${q.id}`}
                    checked={q.correct === idx}
                    onChange={() => updateQuestion(q.id, { correct: idx })}
                  />
                  <span className="label">Correct</span>
                </label>

                <input
                  className="input"
                  value={c.text}
                  onChange={(e) => updateChoice(q.id, c.id, e.target.value)}
                  placeholder={`Choice ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="row" style={{ gap: '.8rem' }}>
        <button className="btn secondary" onClick={addQuestion}>Add question</button>
        <button className="btn" onClick={save} disabled={loading}>
          {loading ? 'Saving...' : 'Save quiz'}
        </button>
      </div>
    </div>
  );
};

export default QuizCreator;
