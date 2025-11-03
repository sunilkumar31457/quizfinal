import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    try {
      await register(email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card max-w-sm register-card">
        <h1 className="title" style={{textAlign:'center'}}>Create account</h1>
        <p className="subtitle" style={{textAlign:'center'}}>Join Quick Quizzer</p>
        <form className="stack" onSubmit={handleSubmit}>
          <div className="stack">
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="stack">
            <label className="label">Password</label>
            <input className="input" type={showPassword?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create a password" minLength={6} required />
          </div>
          <div className="stack">
            <label className="label">Confirm password</label>
            <input className="input" type={showPassword?'text':'password'} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Repeat password" required />
          </div>
          <label className="row" style={{justifyContent:'flex-start'}}>
            <input type="checkbox" checked={showPassword} onChange={(e)=>setShowPassword(e.target.checked)} />
            <span>Show passwords</span>
          </label>
          {error && <div className="badge" style={{borderColor:'var(--danger)', color:'white', background:'rgba(239,68,68,.15)'}}>{error}</div>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <div className="row" style={{justifyContent:'center', marginTop:'1rem'}}>
          <span className="subtitle">Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
