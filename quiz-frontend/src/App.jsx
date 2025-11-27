import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated as checkAuth, logout as apiLogout } from './services/api';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import QuizPlayer from './components/QuizPlayer';
import QuizCreator from './components/QuizCreator';
import QuizResults from './components/QuizResults';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
  };

  const handleLoginSuccess = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  return (
    <div className="app-shell">
      <Router>
        <nav className="nav">
          <div className="nav-inner">
            <Link to={isAuthenticated ? '/dashboard' : '/login'} className="brand">
              <div className="brand-logo" />
              <div className="brand-name">Quick Quizzer</div>
            </Link>
            <div className="nav-links">
              {isAuthenticated ? (
                <>
                  <Link className="btn ghost" to="/dashboard">Dashboard</Link>
                  <Link className="btn ghost" to="/create-quiz">Create</Link>
                  <Link className="btn ghost" to="/leaderboard">Leaderboard</Link>
                  <Link className="btn" to="/logout" onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <>
                  <Link className="btn ghost" to="/login">Login</Link>
                  <Link className="btn" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard userEmail={userEmail} /></ProtectedRoute>} />
            <Route path="/create-quiz" element={<ProtectedRoute><QuizCreator /></ProtectedRoute>} />
            <Route path="/take-quiz/:quizId" element={<ProtectedRoute><QuizPlayer /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/quiz-results" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
            <Route path="/logout" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} Quick Quizzer</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
