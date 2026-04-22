import React from 'react';
import BookingForm from '../components/BookingForm';

const TIPS = [
  { icon: '📅', title: 'Book Early', tip: 'Safari slots, especially for peak season (Oct–Apr), fill up months in advance. Book as early as possible to secure your preferred zone and shift.' },
  { icon: '🌅', title: 'Choose Morning Safaris', tip: 'Morning safaris (6:00–9:30 AM) offer the best chances of tiger sightings when the big cats are most active and light is ideal for photography.' },
  { icon: '🗺️', title: 'Pick Your Zone Wisely', tip: 'Zones 1–5 (core zones) around the lakes and fort offer higher tiger density. Zones 6–10 are buffer zones, quieter but great for birdwatching and leopards.' },
  { icon: '🎽', title: 'Wear Earthy Colours', tip: 'Neutral, muted colours like khaki, brown, and olive are best. Avoid bright colours or white — they can disturb wildlife and reduce sighting chances.' },
  { icon: '📵', title: 'Stay Silent', tip: 'Noise scares away wildlife. Keep voices low and put your phone on silent. Patience and silence are the most effective tools to spot a tiger.' },
  { icon: '💧', title: 'Carry Water & Snacks', tip: 'Safaris last 3–4 hours. Carry water, light snacks, and sunscreen. Shops inside the park are not permitted — be fully prepared before you enter.' },
];

const RULES = [
  'Do not get off the safari vehicle at any point inside the park.',
  'Littering is strictly prohibited. Carry all trash back out.',
  'No flash photography — it disturbs and stresses the animals.',
  'No loud music, honking, or shouting inside the park.',
  'Do not feed any animals — it disrupts their natural behaviour.',
  'Stay within designated safari tracks — off-roading is banned.',
  'Online booking confirmation must be displayed at the entry gate.',
  'Children under 5 are not recommended for early morning safaris.',
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Fill the Form', desc: 'Enter your name, travel date, preferred zone, nationality, and vehicle type below.' },
  { step: '02', title: 'We Confirm', desc: 'Our team checks slot availability and contacts you within 24 hours via WhatsApp or email.' },
  { step: '03', title: 'Make Payment', desc: 'Payment is collected via UPI, bank transfer, or card before your safari date.' },
  { step: '04', title: 'Get Boarding Pass', desc: 'We share your official booking slip and pickup details 48 hours before the safari.' },
  { step: '05', title: 'Experience the Wild', desc: 'Arrive 30 mins early at the gate. Your guide and vehicle will be ready and waiting!' },
];

const Booking = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <span className="inline-flex items-center gap-2 text-green-300 text-sm font-bold uppercase tracking-widest mb-4">🐅 Book Your Safari</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Reserve Your Adventure</h1>
          <p className="text-lg text-green-100/80 font-light max-w-2xl mx-auto">Secure your spot for the ultimate wildlife experience in Ranthambhore National Park — India's most famous tiger reserve.</p>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">How Booking Works</h2>
          <div className="flex flex-col md:flex-row gap-0 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200 z-0 mx-20"></div>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center px-4 mb-8 md:mb-0">
                <div className="w-16 h-16 rounded-2xl bg-green-700 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-lg shadow-green-900/20">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Summary */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Safari Rate List</h2>
            <p className="text-sm text-gray-500 mt-1">Official rates for Gypsy and Canter safaris in Ranthambhore</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">🚙 Gypsy (6 Seater)</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Indian (Shared)</span><span className="font-bold">₹1,900</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Indian (Full)</span><span className="font-bold">₹11,000</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Foreigner (Shared)</span><span className="font-bold">₹4,000</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Foreigner (Full)</span><span className="font-bold">₹24,000</span></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">🚌 Canter (20 Seater)</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Indian (Per Seat)</span><span className="font-bold">₹1,300</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Foreigner (Per Seat)</span><span className="font-bold">₹3,000</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Indian (Tatkal)</span><span className="font-bold">₹2,500</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-600">Foreigner (Tatkal)</span><span className="font-bold">₹8,000</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Safari Tips */}
      <section className="py-16 bg-green-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-white mb-2 text-center">Expert Safari Tips</h2>
          <p className="text-green-300/70 text-center mb-10 text-sm">From seasoned naturalists who've spent years in the jungle</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TIPS.map((t, i) => (
              <div key={i} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-white mb-2">{t.title}</h3>
                <p className="text-green-100/60 text-sm leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="flex-grow py-16 bg-gray-50">
        <div className="flex items-start justify-center px-4">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Safari Booking Request</h2>
                <p className="text-green-100/80 text-sm mt-1">Fill in your details and we will confirm your slot within 24 hours.</p>
              </div>
              <div className="p-8">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3 items-start">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold text-amber-800 text-sm">Important Note</p>
                    <p className="text-amber-700 text-sm mt-1">This is a <strong>booking request form</strong>. Your seat is not confirmed until payment is received and you receive the official booking slip from our team.</p>
                  </div>
                </div>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Park Rules */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">🌿 Park Rules & Regulations</h2>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <p className="text-sm font-bold text-red-800 mb-4 uppercase tracking-wider">Mandatory for all visitors — Violation may result in expulsion from the park.</p>
            <ul className="space-y-3">
              {RULES.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-red-500 font-bold mt-0.5 shrink-0">✕</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;