import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

  const navLinks = [
    { name: 'Works', href: '/portfolio', isRoute: true },
    { name: 'Expertise', href: '#services', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Talk', href: '#contact', isRoute: false }
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setIsMenuOpen(false);
    if (link.isRoute) {
      navigate(link.href);
    } else if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(link.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(link.href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled 
            ? 'py-6 bg-black/50 backdrop-blur-2xl border-b border-white/5' 
            : 'py-12 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.a 
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo(0,0); }}
              className="flex items-center gap-4 group"
              data-cursor="Home"
            >
              <img 
                src="/primesky-logo.png" 
                alt="Logo" 
                className="h-16 w-16 object-contain invert brightness-125 mix-blend-screen transition-all duration-700 group-hover:scale-110" 
              />
              <span className="text-[12px] font-black tracking-[0.8em] text-white uppercase overflow-hidden whitespace-nowrap">
                PRIME<span className="text-emerald-500">SKY</span>
              </span>
            </motion.a>

            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  data-cursor="Link"
                  className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all duration-500 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black p-12 flex flex-col justify-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-12 right-12 text-white"><X /></button>
            <div className="flex flex-col gap-12">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleLinkClick(link)}
                  className="text-6xl font-black text-white/20 hover:text-emerald-500 transition-all text-left uppercase tracking-tighter"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMinimal;
