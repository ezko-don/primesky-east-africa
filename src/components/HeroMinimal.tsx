import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroMinimal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroMedia = [
    { type: 'image', src: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/Rice%20farms%20view.jpg' },
    { type: 'video', src: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/L%20A%20K%20E%20%20N%20A%20T%20R%20O%20N.mp4' },
    { type: 'image', src: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/%23tanzanai.jpg' },
    { type: 'video', src: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/Serengeti%20-%20The%20vast%20plains%20.mp4' },
    { type: 'image', src: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Real%20estate/Zanzibar.jpg' },
    { type: 'video', src: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Real%20estate/muthusovereignsuites.mp4' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background Image Carousel */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <AnimatePresence mode="wait">
          {heroMedia.map((media, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                {media.type === 'image' ? (
                  <img
                    src={media.src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={media.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div 
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight"
          >
            PRIMESKY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl font-light text-white/90 mb-2 tracking-widest"
          >
            EAST AFRICA
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-sm md:text-base font-light text-white/70 tracking-widest uppercase"
          >
            Aerial Photography & Videography
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          onClick={scrollToPortfolio}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Scroll to portfolio"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {heroMedia.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group p-2"
          >
            <div className={`h-1 transition-all duration-500 rounded-full ${
              index === currentSlide ? 'bg-white w-12' : 'bg-white/30 w-6 group-hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroMinimal;

