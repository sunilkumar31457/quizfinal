import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes, getLeaderboard } from '../services/api';
import './Dashboard.css';

const Stat = ({label, value, hint}) => (
  <div className="card stat">
    <div className="space-between">
      <div>
        <div className="label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
      <span className="badge">{hint}</span>
    </div>
  </div>
);

const Dashboard = ({ userEmail }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalPlays: 0,
    avgScore: '0%'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all quizzes
        const quizzesResponse = await getAllQuizzes();
        const allQuizzes = quizzesResponse.data;
        setQuizzes(allQuizzes.slice(0, 3)); // Show first 3 in table
        
        // Fetch leaderboard data to calculate stats
        const leaderboardResponse = await getLeaderboard(100); // Get all attempts
        const attempts = leaderboardResponse.data;
        
        // Calculate real statistics
        const totalQuizzes = allQuizzes.length;
        const totalPlays = attempts.length;
        const avgScore = attempts.length > 0 
          ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / attempts.length)
          : 0;
        
        setStats({
          totalQuizzes,
          totalPlays,
          avgScore: `${avgScore}%`
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container grid dashboard-grid">
      <header className="card hero">
        <div className="hero-inner">
          <div>
            <h1 className="title">Hello{userEmail ? `, ${userEmail}` : ''} 👋</h1>
            <p className="subtitle">Build, share and play quizzes with a sleek, modern interface.</p>
          </div>
          <div className="row hero-actions">
            <Link to="/create-quiz" className="btn">Create quiz</Link>
            <Link to="/leaderboard" className="btn secondary">View leaderboard</Link>
          </div>
        </div>
      </header>

      <section className="grid grid-3">
        <Stat label="Quizzes" value={loading ? '...' : stats.totalQuizzes} hint="Total" />
        <Stat label="Plays" value={loading ? '...' : stats.totalPlays} hint="All time" />
        <Stat label="Avg. Score" value={loading ? '...' : stats.avgScore} hint="Across plays" />
      </section>

      <section className="card">
        <div className="space-between" style={{marginBottom:'.8rem'}}>
          <h3 style={{margin:0}}>Your recent quizzes</h3>
          <Link to="/create-quiz" className="btn ghost">New quiz</Link>
        </div>
        <table className="table">
          <thead>
            <tr><th>Title</th><th>Questions</th><th>Updated</th><th></th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4}>Loading...</td></tr>
            ) : quizzes.length > 0 ? (
              quizzes.map(row => (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>{row.questions?.length || 0}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td style={{textAlign:'right'}}>
                    <Link className="btn ghost" to={`/take-quiz/${row.id}`}>Play</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4}>No quizzes yet. Create your first one!</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
