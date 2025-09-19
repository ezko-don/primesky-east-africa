import React, { useState, useEffect } from 'react';
import { Play, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

const MinimalHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Team media from available folders
  const teamMedia = [
    {
      type: 'video',
      src: '/Images and videos/masai mara.mp4',
      title: 'Team in Action - Masai Mara',
      description: 'Capturing wildlife from above'
    },
    {
      type: 'video', 
      src: '/Images and videos/L A K E  N A T R O N.mp4',
      title: 'Lake Natron Expedition',
      description: 'Professional aerial cinematography'
    },
    {
      type: 'video',
      src: '/Images and videos/Serengeti - The vast plains .mp4',
      title: 'Serengeti Documentation',
      description: 'Endless plains captured by our team'
    },
    {
      type: 'video',
      src: '/Images and videos/Take a few seconds to breath .mp4',
      title: 'Peaceful Moments',
      description: 'The art of aerial meditation'
    },
    {
      type: 'image',
      src: '/Images and videos/Rice farms view.jpg',
      title: 'Agricultural Documentation',
      description: 'Precision agriculture from the sky'
    },
    {
      type: 'image',
      src: '/Images and videos/All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (1).jpg',
      title: 'Zanzibar Paradise',
      description: 'Tourism photography excellence'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMedia.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [teamMedia.length]);

  // Trigger animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMedia.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMedia.length) % teamMedia.length);
  };

  // Split text into letters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block animate-letter-reveal"
        style={{ 
          animationDelay: `${index * 0.1}s`,
          opacity: 0,
          transform: 'translateY(50px)'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Scroll functions for button navigation
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToVideoShowcase = () => {
    // First try to find portfolio section (which contains videos)
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to services section if portfolio not found
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Media Carousel */}
      <div className="absolute inset-0">
        {teamMedia.map((media, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {media.type === 'video' ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={media.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={media.src}
                alt={media.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        {/* Company Logo */}
        <div className={`flex items-center justify-center mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center space-x-4">
            {/* Large Drone Icon */}
            <div className="relative">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 100 100" 
                className="text-emerald-400 hover:rotate-12 transition-transform duration-500 animate-float"
              >
                {/* Drone body */}
                <circle cx="50" cy="50" r="8" fill="currentColor" />
                
                {/* Propellers */}
                <circle cx="25" cy="25" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '1s'}} />
                <circle cx="75" cy="25" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '1s'}} />
                <circle cx="25" cy="75" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '1s'}} />
                <circle cx="75" cy="75" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '1s'}} />
                
                {/* Arms */}
                <line x1="42" y1="42" x2="25" y2="25" stroke="currentColor" strokeWidth="3" />
                <line x1="58" y1="42" x2="75" y2="25" stroke="currentColor" strokeWidth="3" />
                <line x1="42" y1="58" x2="25" y2="75" stroke="currentColor" strokeWidth="3" />
                <line x1="58" y1="58" x2="75" y2="75" stroke="currentColor" strokeWidth="3" />
                
                {/* Signal waves */}
                <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" />
                <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" className="animate-pulse" style={{animationDelay: '1s'}} />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Title with Letter Animation */}
        <h1 className="text-6xl md:text-8xl font-light mb-4 leading-tight">
          <span className="block text-white mb-2">
            {isLoaded && splitText('PRIMESKY')}
          </span>
          <span className="block text-emerald-400">
            {isLoaded && splitText('EAST AFRICA')}
          </span>
        </h1>

        {/* Tagline with Slide Up Animation */}
        <p className={`text-2xl md:text-3xl text-white/90 mb-8 font-light transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block animate-text-glow">SEE BEYOND THE HORIZON</span>
        </p>

        {/* Current Media Description with Fade In */}
        <div className={`mb-12 transition-all duration-1000 delay-1500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-xl text-emerald-400 mb-2 font-medium animate-fade-in-up">
            {teamMedia[currentSlide]?.title}
          </h3>
          <p className="text-white/70 text-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {teamMedia[currentSlide]?.description}
          </p>
        </div>

        {/* Call to Action Buttons with Staggered Animation */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 transition-all duration-1000 delay-2000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
            onClick={scrollToVideoShowcase}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-3 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 animate-bounce-in" 
            style={{animationDelay: '2s'}}
          >
            <Play className="w-5 h-5" />
            Watch Our Work
          </button>
          <button 
            onClick={scrollToPortfolio}
            className="border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 animate-bounce-in" 
            style={{animationDelay: '2.2s'}}
          >
            View Portfolio
          </button>
        </div>

        {/* Media Navigation with Slide In Animation */}
        <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 delay-2500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {teamMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentSlide 
                    ? 'bg-emerald-400 scale-125 animate-pulse' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Stats with Counter Animation */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 bg-black/30 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 delay-3000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center animate-count-up">
            <div className="text-3xl font-light text-emerald-400 mb-2 animate-number-count">50+</div>
            <div className="text-sm text-white/70 uppercase tracking-wider">Projects Completed</div>
          </div>
          <div className="text-center animate-count-up" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl font-light text-emerald-400 mb-2 animate-number-count">2</div>
            <div className="text-sm text-white/70 uppercase tracking-wider">Countries Served</div>
          </div>
          <div className="text-center animate-count-up" style={{animationDelay: '0.4s'}}>
            <div className="text-3xl font-light text-emerald-400 mb-2 animate-number-count">5+</div>
            <div className="text-sm text-white/70 uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="text-center animate-count-up" style={{animationDelay: '0.6s'}}>
            <div className="text-3xl font-light text-emerald-400 mb-2 animate-number-count">100%</div>
            <div className="text-sm text-white/70 uppercase tracking-wider">Client Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Bounce Animation */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-3500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="flex flex-col items-center gap-2 text-white/70 animate-bounce-gentle">
          <span className="text-sm tracking-wider uppercase animate-fade-in-up">Explore Our Work</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes letter-reveal {
          0% {
            opacity: 0;
            transform: translateY(50px) rotateX(90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.95) translateY(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }

        @keyframes count-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes number-count {
          0% {
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-letter-reveal {
          animation: letter-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          opacity: 0;
        }

        .animate-count-up {
          animation: count-up 0.8s ease-out forwards;
        }

        .animate-number-count {
          animation: number-count 1s ease-out forwards;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default MinimalHero;