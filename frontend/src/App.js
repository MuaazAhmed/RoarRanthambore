import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegister from './pages/AdminRegister';

const Navigation = () => {
  const location = useLocation();
  // Don't show public nav on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    relative px-4 py-2 font-medium transition-colors duration-300
    ${isActive(path) ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}
  `;

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-green-800 tracking-tighter flex items-center gap-2">
              <span className="text-3xl">🦏</span>
              Ranthambhore
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/about" className={navLinkClass('/about')}>About</Link>
            <Link to="/gallery" className={navLinkClass('/gallery')}>Gallery</Link>
            <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
            <Link to="/booking" className="ml-4 px-6 py-2.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-0.5">
              Book Safari
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;