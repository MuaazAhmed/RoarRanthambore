import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/admin/login`, creds);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-600 bg-opacity-90 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Admin Portal</h2>
          <p className="text-green-100 font-medium tracking-wide">Secure access to Ranthambhore Safari</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-green-50 block pl-1">Username</label>
            <input 
              name="username" 
              placeholder="Enter your username" 
              onChange={handleChange} 
              className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30 transition-all duration-300 backdrop-blur-sm" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-green-50 block pl-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              onChange={handleChange} 
              className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30 transition-all duration-300 backdrop-blur-sm" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 mt-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-900"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;