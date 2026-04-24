import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';

const AdminRegister = () => {
  const [form, setForm] = useState({ username: '', password: '', code: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API}/api/admin/register`, form);
      navigate('/admin/login', { state: { success: 'Admin account created! Please log in.' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please check your code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-600 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🛡️</div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Admin Account</h1>
            <p className="text-green-200/80 text-sm mt-2">Registration requires a secret code from the system administrator.</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/40 text-red-100 rounded-xl px-4 py-3 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-green-100 block pl-1">Username</label>
              <input
                name="username"
                placeholder="Choose a username"
                onChange={handleChange}
                value={form.username}
                className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30 transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-green-100 block pl-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Choose a strong password"
                onChange={handleChange}
                value={form.password}
                className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30 transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-green-100 block pl-1">Registration Code</label>
              <input
                name="code"
                type="password"
                placeholder="Enter secret registration code"
                onChange={handleChange}
                value={form.code}
                className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30 transition-all"
                required
              />
              <p className="text-xs text-green-300/60 pl-1 mt-1">Default code: <span className="font-mono font-bold text-green-300">letmein</span></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-2 font-bold rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-900 ${loading
                ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                : 'bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Already have an account?{' '}
              <Link to="/admin/login" className="text-green-300 hover:text-green-200 font-semibold transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
