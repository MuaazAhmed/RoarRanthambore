import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Safari Pricing Data
const PRICING = {
  gypsy: {
    title: 'Gypsy Safari (6-Seater)',
    icon: '🚙',
    indian: { shared: '₹1,900/person', full: '₹11,000', tatkal: '₹35,000' },
    foreigner: { shared: '₹4,000/person', full: '₹24,000', tatkal: '₹55,000' },
    timing: 'Morning 6:00 AM – 9:30 AM  |  Evening 3:30 PM – 7:00 PM',
  },
  canter: {
    title: 'Canter Safari (20-Seater)',
    icon: '🚌',
    indian: { shared: '₹1,300/person', tatkal: '₹2,500/person' },
    foreigner: { shared: '₹3,000/person', tatkal: '₹8,000/person' },
    timing: 'Morning 6:30 AM – 10:00 AM  |  Evening 2:30 PM – 6:00 PM',
  },
};

// Did You Know facts
const FACTS = [
  { icon: '🐅', heading: 'The Striped Phantom', text: 'No two tigers have the same stripe pattern — they are as unique as human fingerprints. Ranthambhore is home to over 75 resident tigers.' },
  { icon: '🏰', heading: 'A Fort Older Than India', text: 'Ranthambhore Fort dates back to 944 AD, predating the Mughal Empire. Its walls have witnessed battles, and today deer and leopards roam its ruins.' },
  { icon: '🌿', heading: 'Park of Champions', text: 'Ranthambhore was declared a Project Tiger reserve in 1973 and is credited as one of the biggest successes of Indian conservation history.' },
  { icon: '🦅', heading: '300+ Bird Species', text: 'The park is a birdwatcher\'s paradise with over 300 species of birds including the rare crested serpent eagle, painted stork, and Indian skimmer.' },
  { icon: '🐊', heading: 'Ancient Marshdwellers', text: 'Padam Talab (lake) is home to some of India\'s largest mugger crocodiles, seen basking in the sun alongside deer that share the same water source.' },
  { icon: '🌙', heading: 'Leopard After Dark', text: 'Leopards are predominantly nocturnal and far more elusive than tigers. A leopard sighting in Ranthambhore\'s rocky terrain is considered extremely lucky.' },
  { icon: '🦌', heading: 'Tiger\'s Dinner Table', text: 'Sambar Deer, Chital (Spotted Deer) and Nilgai are the primary prey of tigers. Tigers can consume up to 35 kg of meat in a single kill.' },
  { icon: '🌺', heading: 'Dhok Forest', text: 'The forests of Ranthambhore are dominated by Dhok trees, turning the landscape into shades of red and orange during autumn — spectacular with golden light.' },
];

// Gallery image filenames from /static/gallery/
const GALLERY_IMAGES = [
  { file: 'gallery1.jpg', label: 'Royal Bengal Tiger' },
  { file: 'gallery2.jpg', label: 'Tiger at Padam Talab' },
  { file: 'gallery3.jpg', label: 'Spotted Deer Herd' },
  { file: 'gallery4.jpg', label: 'Ranthambhore Fort' },
  { file: 'gallery5.jpg', label: 'Safari Morning Mist' },
  { file: 'gallery6.jpg', label: 'Sambar at Dawn' },
  { file: 'gallery7.jpg', label: 'Leopard\'s Gaze' },
  { file: 'gallery8.jpg', label: 'Sunset Safari' },
];

const ZONES = [
  { num: '1', name: 'Singhdwar', desc: 'Entry gate zone, historically rich tiger territory' },
  { num: '2', name: 'Lahpur', desc: 'Dense forests, high chances of big cat sightings' },
  { num: '3', name: 'Padam Talab', desc: 'Famous lake zone, tigers & crocodiles frequently spotted' },
  { num: '4', name: 'Malik Talab', desc: 'Beautiful lake, excellent for bird photography' },
  { num: '5', name: 'Kachida Valley', desc: 'Rugged terrain, leopard & sloth bear territory' },
  { num: '6', name: 'Kundal', desc: 'Forested zone with good grass plains and nilgai' },
  { num: '7', name: 'Anantpura', desc: 'Quieter zone in the core buffer, rich biodiversity' },
  { num: '8', name: 'Keladevi', desc: 'Buffer zone with vast landscapes, wild boar country' },
  { num: '9', name: 'Keladevi-2', desc: 'Extended buffer zone, grasslands and scrubforest' },
  { num: '10', name: 'Sherpur-Khilchipur', desc: 'Northern section, remote and serene wilderness' },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  // Auto-advance gallery
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Rotate facts
  useEffect(() => {
    const timer = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % FACTS.length);
        setFactVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const fact = FACTS[factIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image – place home.jpg in /public/static/ */}
        <img
          src="/static/home.jpg"
          alt="Ranthambhore National Park"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Fallback gradient shown when image is missing */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-900 to-green-700" /> */}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-green-500/20 text-green-200 border border-green-500/40 text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
            🐅 Discover the Wild
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
            Journey Into The Heart of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-amber-300">
              Ranthambhore
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            India's premier tiger reserve — where every safari is a story waiting to be told.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-900/50 transform hover:-translate-y-1"
            >
              Book Your Safari
            </Link>
            <a
              href="#gallery-slide"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl font-bold text-lg border border-white/20 transition-all duration-300"
            >
              Explore Gallery ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── DID YOU KNOW CARD ── */}
      <section className="py-16 bg-gradient-to-r from-green-950 to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-green-400 text-sm font-bold uppercase tracking-widest mb-4">🌿 Did You Know?</p>
          <div
            className="transition-all duration-2000 ease-in-out"
            style={{ opacity: factVisible ? 1 : 0, transform: factVisible ? 'translateY(0)' : 'translateY(12px)' }}
          >
            <div className="text-5xl mb-4">{fact.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{fact.heading}</h3>
            <p className="text-lg text-green-100/80 max-w-2xl mx-auto leading-relaxed">{fact.text}</p>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {FACTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFactIndex(i); setFactVisible(true); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === factIndex ? 'bg-green-400 w-6' : 'bg-green-400/30'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY SLIDER ── */}
      <section id="gallery-slide" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Safari Gallery</h2>
            <p className="mt-3 text-lg text-gray-500">Wildlife, landscapes, and unforgettable moments from the heart of Ranthambhore</p>
          </div>

          {/* Slide container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Main Image */}
            <div className="relative h-[480px] md:h-[600px] bg-gray-900">
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={`/static/gallery/${img.file}`}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.parentNode.style.background = 'linear-gradient(135deg, #1a3a2a 0%, #2d6a4a 50%, #1a3a2a 100%)';
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <p className="text-white font-bold text-xl">{img.label}</p>
                    <p className="text-white/60 text-sm">Ranthambhore National Park</p>
                  </div>
                  {/* Placeholder shimmer when image is missing */}
                  {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-white/20">
                      <p className="text-6xl mb-2">🦁</p>
                      <p className="text-lg font-medium">Add {img.file} to /public/static/gallery/</p>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xl transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >‹</button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xl transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >›</button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 right-8 flex gap-1.5">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-8 gap-2 mt-3">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-16 rounded-xl overflow-hidden transition-all duration-200 ${i === currentSlide ? 'ring-2 ring-green-500 ring-offset-2 scale-105' : 'opacity-60 hover:opacity-90'}`}
              >
                <div className="relative w-full h-full bg-gray-800">
                  <img src={`/static/gallery/${img.file}`} alt={img.label} className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs font-bold">{i + 1}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Safari Pricing</h2>
            <p className="mt-3 text-lg text-gray-500">Transparent pricing — no hidden charges. Slots are limited and fill up fast!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gypsy */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <div className="bg-gradient-to-r from-green-800 to-emerald-700 px-8 py-6 text-white">
                <div className="text-3xl mb-2">🚙</div>
                <h3 className="text-2xl font-extrabold">Gypsy Safari</h3>
                <p className="text-green-100 text-sm mt-1">6-Seater Open Jeep — Best for small groups</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">🇮🇳 Indian</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-50 rounded-xl p-3"><p className="text-xs text-gray-500">Shared/Seat</p><p className="font-bold text-green-800">₹1,900</p></div>
                      <div className="bg-green-50 rounded-xl p-3"><p className="text-xs text-gray-500">Full Gypsy</p><p className="font-bold text-green-800">₹11,000</p></div>
                      <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs text-gray-500">Tatkal</p><p className="font-bold text-amber-700">₹35,000</p></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">🌍 Foreigner</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-gray-500">Shared/Seat</p><p className="font-bold text-blue-800">₹4,000</p></div>
                      <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-gray-500">Full Gypsy</p><p className="font-bold text-blue-800">₹24,000</p></div>
                      <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs text-gray-500">Tatkal</p><p className="font-bold text-amber-700">₹55,000</p></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                    <span className="font-semibold">🕐 Timings: </span>Morning 6:00 AM – 9:30 AM | Evening 3:30 PM – 7:00 PM
                    <p className="text-xs text-gray-400 mt-1">Timings vary by season</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Canter */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <div className="bg-gradient-to-r from-amber-700 to-orange-600 px-8 py-6 text-white">
                <div className="text-3xl mb-2">🚌</div>
                <h3 className="text-2xl font-extrabold">Canter Safari</h3>
                <p className="text-amber-100 text-sm mt-1">20-Seater Open Bus — Ideal for larger groups & budget travellers</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">🇮🇳 Indian</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-green-50 rounded-xl p-3"><p className="text-xs text-gray-500">Per Person</p><p className="font-bold text-green-800">₹1,300</p></div>
                      <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs text-gray-500">Tatkal/Person</p><p className="font-bold text-amber-700">₹2,500</p></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">🌍 Foreigner</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-gray-500">Per Person</p><p className="font-bold text-blue-800">₹3,000</p></div>
                      <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs text-gray-500">Tatkal/Person</p><p className="font-bold text-amber-700">₹8,000</p></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                    <span className="font-semibold">🕐 Timings: </span>Morning 6:30 AM – 10:00 AM | Evening 2:30 PM – 6:00 PM
                    <p className="text-xs text-gray-400 mt-1">Timings vary by season</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/booking"
              className="inline-block px-10 py-4 bg-green-700 hover:bg-green-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              Book a Safari Slot →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SAFARI ZONES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Safari Zones</h2>
            <p className="mt-3 text-lg text-gray-500">Ranthambhore is divided into 10 zones — each offering a unique landscape and wildlife experience</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {ZONES.map((z) => (
              <div key={z.num} className="group bg-gray-50 hover:bg-green-800 rounded-2xl p-4 transition-all duration-300 cursor-default text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1">
                <div className="w-10 h-10 bg-green-100 group-hover:bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <span className="font-extrabold text-green-700 group-hover:text-white transition-colors">{z.num}</span>
                </div>
                <p className="font-bold text-gray-900 group-hover:text-white text-sm transition-colors">{z.name}</p>
                <p className="text-xs text-gray-500 group-hover:text-green-200 mt-1 transition-colors">{z.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-gradient-to-b from-green-950 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: '🐅', title: 'Highest Tiger Density', desc: 'Ranthambhore has one of the highest tiger densities in India, giving you the best odds of a spectacular big cat encounter.' },
              { icon: '🧭', title: 'Expert Naturalists', desc: 'Our certified guides know every corner of the park. They read animal signs, tracks and calls to bring you closer to the action.' },
              { icon: '📋', title: 'Hassle-Free Booking', desc: 'Book online in minutes. We handle all permit paperwork. Your slot is confirmed within 24 hours of your request.' },
            ].map((f, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-green-100/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Spot the Stripes?</h2>
          <p className="text-lg text-gray-500 mb-8">Tiger safari slots are limited and fill up months in advance. Don't miss your chance.</p>
          <Link
            to="/booking"
            className="inline-block px-10 py-4 bg-green-700 text-white rounded-2xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:-translate-y-1"
          >
            Reserve Your Safari Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;