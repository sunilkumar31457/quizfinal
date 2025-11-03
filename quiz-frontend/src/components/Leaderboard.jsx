import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard(20); // Get top 20
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  return (
    <div className="container stack">
      <header className="card">
        <h1 className="title" style={{marginBottom:'.2rem'}}>Leaderboard 🏆</h1>
        <p className="subtitle">Top performers across all quizzes</p>
      </header>
      
      <section className="card">
        {loading ? (
          <p>Loading leaderboard...</p>
        ) : entries.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{getRankEmoji(index)}</td>
                  <td>{entry.playerEmail}</td>
                  <td>{entry.quizTitle}</td>
                  <td>{entry.score}/{entry.totalQuestions}</td>
                  <td>
                    <span className="badge" style={{
                      background: entry.percentage >= 80 ? 'rgba(34, 197, 94, 0.15)' : 
                                 entry.percentage >= 60 ? 'rgba(250, 204, 21, 0.15)' : 
                                 'rgba(239, 68, 68, 0.15)'
                    }}>
                      {entry.percentage.toFixed(1)}%
                    </span>
                  </td>
                  <td>{formatDate(entry.attemptedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quiz attempts yet. Be the first to play!</p>
        )}
      </section>
    </div>
  );
};

export default Leaderboard;
