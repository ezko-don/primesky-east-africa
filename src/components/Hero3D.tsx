import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero3D = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const heroImages = [
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/Rice%20farms%20view.jpg',
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/%23tanzanai.jpg',
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Real%20estate/Zanzibar.jpg',
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/IMG_4391.jpg'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Background Image Carousel with 3D effect */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px) translateZ(0)`,
          perspective: '1000px'
        }}
      >
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Gradient Overlay with glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content with 3D transform */}
      <div 
        className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10"
        style={{ 
          opacity: Math.max(0, 1 - scrollY / 500),
          transform: `translateY(${scrollY * 0.3}px) translateZ(0)`
        }}
      >
        {/* Glassmorphism card */}
        <div 
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <h1 className="text-7xl md:text-9xl font-extralight text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-white">
            PRIMESKY
          </h1>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-6" />
          <p className="text-2xl md:text-3xl font-light text-emerald-300 mb-4 tracking-widest">
            EAST AFRICA
          </p>
          <p className="text-sm md:text-base font-light text-white/70 tracking-[0.3em] uppercase">
            Aerial Photography & Videography
          </p>
          
          {/* 3D Button */}
          <button
            onClick={scrollToPortfolio}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-light tracking-wider hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            View Portfolio
          </button>
        </div>

        {/* Scroll Indicator with animation */}
        <button
          onClick={scrollToPortfolio}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-emerald-400 transition-colors animate-bounce"
          aria-label="Scroll to portfolio"
        >
          <div className="flex flex-col items-center gap-2">
            <ChevronDown className="w-8 h-8" />
            <span className="text-xs tracking-widest uppercase">Scroll</span>
          </div>
        </button>
      </div>

      {/* Slide Indicators with 3D effect */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-emerald-400 w-10 h-3 shadow-lg shadow-emerald-400/50' 
                : 'bg-white/30 w-3 h-3 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero3D;
