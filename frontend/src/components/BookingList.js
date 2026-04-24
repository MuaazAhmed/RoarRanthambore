import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(`${API}/api/bookings`, { headers: { Authorization: `Bearer ${token}` } });
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/api/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBookings(bookings.filter(b => b.id !== id));
    } catch (err) {
      alert("Failed to delete booking.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const bookingToUpdate = bookings.find(b => b.id === id);
      const updatedBooking = { ...bookingToUpdate, status: newStatus };

      await axios.put(`${API}/api/bookings/${id}`, updatedBooking, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBookings(bookings.map(b => b.id === id ? updatedBooking : b));
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
    }
  };

  const statusColors = {
    'Fresh': 'bg-blue-100 text-blue-800 border-blue-200',
    'Contacted': 'bg-amber-100 text-amber-800 border-amber-200',
    'Paid': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Done': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-medium text-lg">No bookings found.</p>
        <p className="text-gray-400 text-sm mt-1">Looks like the safari is quiet today.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid" : date.toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Guest & Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Safari Details</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Zone</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">#{b.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">{b.name || 'Anonymous Guest'}</div>
                <div className="text-xs text-gray-500 flex flex-col mt-0.5 space-y-0.5">
                  <span className="truncate max-w-[200px]">{b.email}</span>
                  <span className="text-green-700 font-semibold">{b.whatsapp || 'No WhatsApp'}</span>
                  <span className="text-gray-400 italic">{b.nationality || 'Not specified'}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-medium">{b.vehicle || 'Not selected'}</div>
                <div className="text-xs text-gray-500 mt-0.5">{b.shift || 'Unknown'} Shift</div>
                <div className="text-xs font-bold text-amber-700 mt-0.5 bg-amber-50 px-2 py-0.5 rounded inline-block">
                  {b.num_people || 0} {b.num_people === 1 ? 'Guest' : 'Guests'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col items-start gap-1">
                  <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-100 text-blue-800">
                    {formatDate(b.date)}
                  </span>
                  <span className="text-xs text-gray-600 font-semibold px-2">
                    {b.zone || 'No Zone'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={b.status || 'Fresh'}
                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                  className={`text-xs font-bold rounded-full px-3 py-1 border-2 outline-none cursor-pointer transition-all ${statusColors[b.status || 'Fresh']}`}
                >
                  <option value="Fresh">Fresh</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Paid">Paid</option>
                  <option value="Done">Done</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(b.id)}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
