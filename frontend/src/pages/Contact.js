import React, { useState } from 'react';
import axios from 'axios';

const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080' : '';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post(`${API}/api/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-amber-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Get In Touch</h1>
          <p className="text-lg text-amber-100 font-light">We're here to help you plan the perfect jungle safari.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

            {status === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center gap-3">
                <span className="text-xl">✅</span>
                <p className="font-medium text-sm">Your message has been sent! We'll get back to you within 24 hours.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <p className="font-medium text-sm">Something went wrong. Please try again or contact us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  status === 'submitting'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 hover:-translate-y-0.5'
                }`}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-8">Reach out to our Safari Experts for custom itineraries, bulk bookings, or general inquiries. We aim to respond within 24 hours.</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Office Location</h4>
                <p className="text-gray-600 mt-1">12 Tiger Reserve Road<br />Sawai Madhopur, Rajasthan 322001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Phone</h4>
                <p className="text-gray-600 mt-1">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Email</h4>
                <p className="text-amber-600 font-medium mt-1">safari@ranthambhore.example.com</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-sm text-amber-800 font-medium">🕐 Response Time</p>
              <p className="text-amber-700 text-sm mt-1">We typically respond within <strong>24 hours</strong> via email or WhatsApp.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;