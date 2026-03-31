import React from 'react';
import BookingList from '../components/BookingList';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation for Admin Portal */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 text-green-800 font-bold text-xl tracking-tight">
              <span className="text-2xl">🛡️</span>
              Admin Portal
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-gray-500">Manage safari bookings, approve requests, and oversee operations.</p>
          </div>

          {/* Statistics Cards Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Bookings</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">Active</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Review</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">Check Below</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">System Status</p>
              <p className="text-4xl font-bold text-green-600 mt-2">Online</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg leading-6 font-semibold text-gray-900">Recent Booking Requests</h3>
            </div>
            <div className="p-6">
              <BookingList />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;