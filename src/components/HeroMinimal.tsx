import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroMinimal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/Rice%20farms%20view.jpg',
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/%23tanzanai.jpg',
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Real%20estate/Zanzibar.jpg',
    'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/IMG_4391.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
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
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight">
          PRIMESKY
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/90 mb-2 tracking-widest">
          EAST AFRICA
        </p>
        <p className="text-sm md:text-base font-light text-white/70 tracking-widest uppercase">
          Aerial Photography & Videography
        </p>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToPortfolio}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to portfolio"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroMinimal;
