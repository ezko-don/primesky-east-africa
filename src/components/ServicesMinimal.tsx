import React from 'react';
import { Camera, Video, Map, Building } from 'lucide-react';

const ServicesMinimal = () => {
  const services = [
    {
      icon: Camera,
      title: 'Aerial Photography',
      description: 'Professional drone photography capturing stunning perspectives from above'
    },
    {
      icon: Video,
      title: 'Videography',
      description: 'Cinematic aerial videography for weddings, events, and commercial projects'
    },
    {
      icon: Map,
      title: 'Mapping & Surveying',
      description: 'Precision mapping and land surveying for construction and agriculture'
    },
    {
      icon: Building,
      title: 'Real Estate',
      description: 'Showcase properties with breathtaking aerial views and virtual tours'
    }
  ];

  return (
    <section id="services" className="py-24 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-4 tracking-tight">
            Services
          </h2>
          <p className="text-neutral-600 font-light max-w-2xl mx-auto">
            Licensed drone services across Kenya and Tanzania
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center border border-neutral-300 group-hover:border-neutral-900 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-neutral-600 group-hover:text-neutral-900 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-neutral-900 mb-3 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesMinimal;
