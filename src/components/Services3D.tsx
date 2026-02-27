import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Map, Building } from 'lucide-react';

const Services3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Camera,
      title: 'Aerial Photography',
      description: 'Professional drone photography capturing stunning perspectives from above',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Video,
      title: 'Videography',
      description: 'Cinematic aerial videography for weddings, events, and commercial projects',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Map,
      title: 'Mapping & Surveying',
      description: 'Precision mapping and land surveying for construction and agriculture',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Building,
      title: 'Real Estate',
      description: 'Showcase properties with breathtaking aerial views and virtual tours',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-900 relative overflow-hidden" ref={sectionRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4" />
            <h2 className="text-6xl md:text-7xl font-extralight text-white mb-4 tracking-tight">
              Services
            </h2>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </div>
          <p className="text-emerald-300 font-light max-w-2xl mx-auto text-lg">
            Licensed drone services across Kenya and Tanzania
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={index} 
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transform: isHovered ? 'translateY(-12px) scale(1.05)' : '',
                  perspective: '1000px'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 3D Card with glassmorphism */}
                <div className="relative h-full p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon with 3D effect */}
                  <div className="relative mb-6 flex justify-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                      <div className="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wide text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed text-center">
                    {service.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${service.gradient} opacity-20 transform rotate-45 translate-x-10 -translate-y-10`} />
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services3D;
