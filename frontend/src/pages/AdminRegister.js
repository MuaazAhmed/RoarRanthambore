import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [form, setForm] = useState({ username: '', password: '', code: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/admin/register', form);
      alert('Admin created — please login');
      navigate('/admin/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };ds

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md">
      <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
      <input name="code" placeholder="Registration code" onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-green-600 text-white p-2">Register Admin</button>
    </form>
  );
};

export default AdminRegister;
