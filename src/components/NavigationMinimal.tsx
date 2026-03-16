import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationMinimal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Portfolio', href: '/portfolio', isRoute: true },
    { name: 'Services', href: '#services', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false }
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setIsMenuOpen(false);
    
    if (link.isRoute) {
      navigate(link.href);
    } else if (location.pathname !== '/') {
      // If not on home page, go to home first then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(link.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full h-16 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-sm' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img 
              src="/primesky-logo.png" 
              alt="PrimeSky" 
              className="h-8 w-8"
            />
            <span className="text-lg font-light tracking-wider text-neutral-900">
              PRIMESKY
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="text-sm uppercase tracking-widest text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-30 md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="text-2xl font-light text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMinimal;
