import React from 'react';

const Contact = () => {
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

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea rows="4" placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
              </div>
              <button
                type="button"
                onClick={() => alert('Message Sent (Demo)')}
                className="w-full py-4 text-white font-bold rounded-xl shadow-lg bg-amber-600 hover:bg-amber-700 transition-colors focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

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
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;