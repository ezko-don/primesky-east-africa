import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, MessageCircle, Phone } from 'lucide-react';

const MinimalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SERVICES', href: '#services' },
    { name: 'PORTFOLIO', href: '#portfolio' }, 
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ${
        scrolled 
          ? 'bg-neutral-900/95 backdrop-blur-md border-emerald-400/20 shadow-lg shadow-emerald-400/10' 
          : 'bg-neutral-900/80 backdrop-blur-sm border-neutral-800'
      }`}
    >
      <div className="container mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3 group">
              {/* Drone Icon */}
              <div className="relative">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 100 100" 
                  className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300"
                >
                  {/* Drone body */}
                  <circle cx="50" cy="50" r="8" fill="currentColor" />
                  
                  {/* Propellers */}
                  <circle cx="25" cy="25" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '0.5s'}} />
                  <circle cx="75" cy="25" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '0.5s'}} />
                  <circle cx="25" cy="75" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '0.5s'}} />
                  <circle cx="75" cy="75" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '0.5s'}} />
                  
                  {/* Arms */}
                  <line x1="42" y1="42" x2="25" y2="25" stroke="currentColor" strokeWidth="3" />
                  <line x1="58" y1="42" x2="75" y2="25" stroke="currentColor" strokeWidth="3" />
                  <line x1="42" y1="58" x2="25" y2="75" stroke="currentColor" strokeWidth="3" />
                  <line x1="58" y1="58" x2="75" y2="75" stroke="currentColor" strokeWidth="3" />
                  
                  {/* Signal waves */}
                  <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
                  <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
                </svg>
              </div>
              
              {/* Company Name */}
              <div className="flex flex-col">
                <h1 className="text-lg font-light tracking-wider text-white relative">
                  <span className="inline-block hover:text-emerald-400 transition-colors duration-300">
                    PRIMESKY
                  </span>
                  <span className="text-emerald-400"> EAST AFRICA</span>
                </h1>
                <p className="text-xs text-emerald-400/80 tracking-widest font-light">
                  SEE BEYOND THE HORIZON
                </p>
              </div>
              
              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 w-0 group-hover:w-full transition-all duration-300" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-normal tracking-[0.2em] text-neutral-300 hover:text-emerald-400 transition-all duration-300 relative group hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                
                {/* Hover effect line */}
                <div className="absolute -bottom-1 left-0 h-0.5 bg-emerald-400 w-0 group-hover:w-full transition-all duration-300" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-emerald-400/10 rounded-md -z-10 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-120 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Cart Icon */}
          <div className="hidden lg:flex">
            <button className="text-neutral-300 hover:text-emerald-400 transition-all duration-300 relative hover:scale-120 hover:rotate-6">
              <ShoppingCart className="h-5 w-5" />
              
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full pulse-glow" />
            </button>
          </div>

          {/* WhatsApp and Call Icons */}
          <div className="hidden lg:flex space-x-4">
            <a href="https://wa.me/+254712345678" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 text-neutral-300 hover:text-emerald-400 transition-all duration-300" />
            </a>
            <a href="tel:+254712345678">
              <Phone className="h-5 w-5 text-neutral-300 hover:text-emerald-400 transition-all duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white relative hover:scale-110 transition-transform duration-200"
            >
              <div className={`transition-all duration-200 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu className="h-6 w-6" />
              </div>
              <div className={`absolute inset-0 transition-all duration-200 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                <X className="h-6 w-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden border-t border-emerald-400/20 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 px-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-normal tracking-[0.2em] text-neutral-300 hover:text-emerald-400 transition-all duration-300 text-center relative group hover:scale-105 py-2"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.3s ease ${index * 0.1}s`
                  }}
                >
                  {link.name}
                  
                  {/* Mobile hover effect */}
                  <div className="absolute inset-0 bg-emerald-400/10 rounded-md -z-10 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </a>
              ))}
              
              {/* Mobile Contact Actions */}
              <div className="flex justify-center items-center pt-4 space-x-6 border-t border-emerald-400/20">
                {/* WhatsApp Button */}
                <a 
                  href="https://wa.me/254741464497" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-1 text-neutral-300 hover:text-emerald-400 transition-all duration-300 group"
                  title="WhatsApp Us"
                >
                  <div className="relative">
                    <MessageCircle className="h-6 w-6" />
                    <div className="absolute inset-0 bg-emerald-400/10 rounded-full -z-10 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                  </div>
                  <span className="text-xs">WhatsApp</span>
                </a>
                
                {/* Call Button */}
                <a 
                  href="tel:+254741464497"
                  className="flex flex-col items-center space-y-1 text-neutral-300 hover:text-emerald-400 transition-all duration-300 group"
                  title="Call Us"
                >
                  <div className="relative">
                    <Phone className="h-6 w-6" />
                    <div className="absolute inset-0 bg-emerald-400/10 rounded-full -z-10 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                  </div>
                  <span className="text-xs">Call</span>
                </a>
                
                {/* Cart Icon */}
                <button className="flex flex-col items-center space-y-1 text-neutral-300 hover:text-emerald-400 transition-all duration-300 group">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    
                    {/* Notification dot */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full pulse-glow" />
                    <div className="absolute inset-0 bg-emerald-400/10 rounded-full -z-10 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                  </div>
                  <span className="text-xs">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavigation;