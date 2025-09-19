import React from 'react';
import { Camera, Map, Heart, Car, Building, Plane, ArrowRight, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Real Estate Drone Shots",
      description: "Professional aerial photography and videography for luxury properties, commercial developments, and residential listings.",
      icon: <Camera className="w-8 h-8" />,
      features: ["4K Video Recording", "HDR Photography", "360° Virtual Tours", "Twilight Shots"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Aerial Mapping & Surveying", 
      description: "Precise topographic mapping, land surveys, and 3D modeling for construction and development projects.",
      icon: <Map className="w-8 h-8" />,
      features: ["Precision Mapping", "3D Modeling", "Land Surveys", "Progress Tracking"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Wedding & Event Coverage",
      description: "Cinematic aerial documentation of weddings, corporate events, and special celebrations.",
      icon: <Heart className="w-8 h-8" />,
      features: ["Cinematic Shots", "Live Streaming", "Same-Day Edits", "Multi-Angle Coverage"],
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Car & Motion Filming",
      description: "Dynamic aerial shots for automotive showcases, commercials, and promotional content.",
      icon: <Car className="w-8 h-8" />,
      features: ["Dynamic Tracking", "High-Speed Filming", "Commercial Quality", "Action Sequences"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Construction Progress Documentation",
      description: "Regular aerial monitoring and documentation of construction projects and infrastructure development.",
      icon: <Building className="w-8 h-8" />,
      features: ["Progress Reports", "Time-lapse Videos", "Safety Monitoring", "Quality Assurance"],
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section id="services" className="min-h-screen py-32 bg-neutral-900 text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/20"></div>
      </div>

      <div className="container mx-auto px-8 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <Plane className="w-12 h-12 text-emerald-400" />
              <div className="h-px w-16 bg-emerald-400"></div>
              <span className="text-emerald-400 font-light tracking-widest text-sm">PROFESSIONAL SERVICES</span>
              <div className="h-px w-16 bg-emerald-400"></div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-light tracking-wide text-white mb-6">
            OUR <span className="text-emerald-400">SERVICES</span>
          </h2>
          
          <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
            Licensed drone services across Kenya with Remote Pilot Licence 
            <span className="text-emerald-400 font-medium"> XK-RPI-0663A</span>
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Professional Equipment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Experienced Pilots</span>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative bg-neutral-800/50 border border-neutral-700 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-light tracking-wide text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-sm text-white/60">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <button className="flex items-center gap-2 text-emerald-400 hover:text-white font-medium group-hover:gap-4 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-neutral-800/30 border border-neutral-700 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-white mb-4">
              Ready to Take Your Project to New Heights?
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Get a custom quote for your aerial photography and videography needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25">
                Get Free Quote
              </button>
              <button className="border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;