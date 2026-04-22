import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', zone: '', whatsapp: '', nationality: 'Indian', shift: '', vehicle: '', num_people: 1 });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Parse num_people to int to match Go backend struct
      const payload = {
        ...formData,
        num_people: parseInt(formData.num_people, 10) || 1
      };
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/bookings`, payload);
      setStatus('success');

      // Pseudo Razorpay logic
      if (window.Razorpay) {
        const options = {
          key: 'YOUR_RAZORPAY_KEY',
          amount: 50000,
          currency: 'INR',
          name: 'Ranthambhore Safari',
          description: 'Safari Booking',
          handler: function (response) {
            alert('Payment successful: ' + response.razorpay_payment_id);
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setTimeout(() => alert("Booking request submitted successfully! We will contact you for payment."), 500);
      }

      setFormData({ name: '', email: '', date: '', zone: '', whatsapp: '', nationality: 'Indian', shift: '', vehicle: '', num_people: 1 });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p className="font-medium text-sm">Your booking request has been successfully submitted!</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <p className="font-medium text-sm">There was an error submitting your request. Please try again.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Email Address</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="john@example.com"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Safari Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Preferred Zone</label>
          <select
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          >
            <option value="" disabled>Select Safari Zone</option>
            <option value="Zone 1">Zone 1 - Singhdwar</option>
            <option value="Zone 2">Zone 2 - Lahpur</option>
            <option value="Zone 3">Zone 3 - Padam Talab</option>
            <option value="Zone 4">Zone 4 - Malik Talab</option>
            <option value="Zone 5">Zone 5 - Kachida</option>
            <option value="Zone 6">Zone 6 - Kundal</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">WhatsApp Number</label>
          <input
            name="whatsapp"
            type="tel"
            value={formData.whatsapp}
            placeholder="+91 9876543210"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Nationality</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          >
            <option value="Indian">Indian</option>
            <option value="Foreigner">Foreigner</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Safari Shift</label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          >
            <option value="" disabled>Select Shift</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Vehicle Type</label>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          >
            <option value="" disabled>Select Vehicle</option>
            <option value="Shared Gypsy">Shared Gypsy (6 Seater)</option>
            <option value="Full Gypsy">Full Gypsy (Exclusive)</option>
            <option value="Shared Canter">Shared Canter (20 Seater)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 block pl-1">Number of People</label>
          <input
            name="num_people"
            type="number"
            min="1"
            max="20"
            value={formData.num_people}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full py-4 mt-6 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${status === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:-translate-y-0.5'}`}
      >
        {status === 'submitting' ? 'Processing...' : 'Request Booking'}
      </button>
    </form>
  );
};

export default BookingForm;