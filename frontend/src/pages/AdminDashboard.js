import React, { useState, useEffect, useCallback } from 'react';
import BookingList from '../components/BookingList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080' : '';

// ── Messages Panel ─────────────────────────────────────────────────────────────
const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleMarkRead = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API}/api/contact/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
    } catch (err) {
      alert('Failed to mark as read.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m.id !== id));
      if (expanded === id) setExpanded(null);
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? ts : d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    } catch { return ts; }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-5xl mb-3">✉️</p>
        <p className="text-gray-500 font-medium text-lg">No messages yet.</p>
        <p className="text-gray-400 text-sm mt-1">Messages from the Contact page will appear here.</p>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-3">
      {unreadCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 font-medium flex items-center gap-2">
          <span>🔔</span>
          {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
        </div>
      )}
      {messages.map((m) => (
        <div
          key={m.id}
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${m.is_read
            ? 'border-gray-100 bg-white'
            : 'border-amber-200 bg-amber-50/40 shadow-sm'
            }`}
        >
          {/* Header row */}
          <div
            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50/70 transition-colors"
            onClick={() => {
              setExpanded(expanded === m.id ? null : m.id);
              if (!m.is_read) handleMarkRead(m.id);
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              {!m.is_read && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className={`font-semibold text-sm truncate ${m.is_read ? 'text-gray-700' : 'text-gray-900'}`}>
                  {m.name}
                  <span className="ml-2 text-gray-400 font-normal text-xs">{m.email}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(m.created_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              {m.is_read && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Read</span>
              )}
              <span className="text-gray-400 text-sm">{expanded === m.id ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* Expanded message body */}
          {expanded === m.id && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 border border-gray-100">
                {m.message}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={`mailto:${m.email}`}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Reply via Email
                </a>
                {!m.is_read && (
                  <button
                    onClick={() => handleMarkRead(m.id)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(m.id)}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-lg transition-colors ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ── Admin Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, messages: 0 });
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }

    const fetchStats = async () => {
      try {
        const [bookingsResult, messagesResult] = await Promise.allSettled([
          axios.get(`${API}/api/bookings`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/contact`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const bookings = bookingsResult.status === 'fulfilled' && Array.isArray(bookingsResult.value.data)
          ? bookingsResult.value.data : [];
        const msgs = messagesResult.status === 'fulfilled' && Array.isArray(messagesResult.value.data)
          ? messagesResult.value.data : [];
        setStats({
          total: bookings.length,
          pending: bookings.filter(b => b.status === 'Fresh' || !b.status).length,
          messages: msgs.filter(m => !m.is_read).length,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const TABS = [
    { id: 'bookings', label: '📋 Bookings', badge: stats.pending },
    { id: 'messages', label: '✉️ Messages', badge: stats.messages },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Nav */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 text-green-800 font-bold text-xl tracking-tight">
              <span className="text-2xl">🛡️</span>
              Admin Portal
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-gray-500">Manage safari bookings, approve requests, and view contact messages.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Bookings</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Review</p>
              <p className="text-4xl font-bold text-amber-600 mt-2">{stats.pending}</p>
            </div>
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:border-amber-300 transition-colors"
              onClick={() => setActiveTab('messages')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Unread Messages</p>
              <p className={`text-4xl font-bold mt-2 ${stats.messages > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{stats.messages}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">System Status</p>
              <p className="text-4xl font-bold text-green-600 mt-2">Online</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 ${activeTab === tab.id
                    ? 'border-green-600 text-green-700 bg-green-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {tab.label}
                  {tab.badge > 0 && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'bg-amber-100 text-amber-700'
                      }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'bookings' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-5">Incoming Booking Requests</h3>
                  <BookingList />
                </>
              )}
              {activeTab === 'messages' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-5">Contact Messages</h3>
                  <MessagesPanel />
                </>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;