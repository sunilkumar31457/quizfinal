import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await login(email, password);
      onLoginSuccess(response.email);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card max-w-sm login-card">
        <h1 className="title" style={{textAlign:'center'}}>Welcome back</h1>
        <p className="subtitle" style={{textAlign:'center'}}>Sign in to continue</p>
        <form className="stack" onSubmit={handleSubmit}>
          <div className="stack">
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="stack">
            <label className="label">Password</label>
            <input className="input" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            <label className="row" style={{justifyContent:'flex-start'}}>
              <input type="checkbox" checked={showPassword} onChange={(e)=>setShowPassword(e.target.checked)} />
              <span>Show password</span>
            </label>
          </div>
          {error && <div className="badge" style={{borderColor:'var(--danger)', color:'white', background:'rgba(239,68,68,.15)'}}>{error}</div>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="row" style={{justifyContent:'center', marginTop:'1rem'}}>
          <span className="subtitle">No account?</span>
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
