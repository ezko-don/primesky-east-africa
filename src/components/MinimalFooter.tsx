import React from 'react';
import { Plane, Phone, Mail, MapPin } from 'lucide-react';

const MinimalFooter = () => {
  return (
    <footer className="py-20 bg-neutral-800 border-t border-neutral-700 text-white">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Plane className="w-8 h-8 text-emerald-400 mr-3" />
              <h3 className="text-lg font-medium tracking-wide text-white">
                PRIMESKY EAST AFRICA
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed font-light mb-6 max-w-md">
              Licensed drone services across Kenya. Professional aerial photography, 
              videography, and documentation with Remote Pilot Licence XK-RPI-0663A.
            </p>
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span>Licensed & Insured</span>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-medium tracking-wide text-white mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Real Estate</a></li>
              <li><a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Weddings & Events</a></li>
              <li><a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Construction</a></li>
              <li><a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Aerial Mapping</a></li>
              <li><a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Commercial</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium tracking-wide text-white mb-6">
              CONTACT
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-white/70 font-light">+254 741 464497</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-white/70 font-light">info@primeskyea.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-white/70 font-light">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="mt-16 pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <nav className="flex flex-wrap justify-center md:justify-start gap-8">
              <a href="#home" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Home</a>
              <a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Services</a>
              <a href="#portfolio" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Portfolio</a>
              <a href="#about" className="text-white/70 hover:text-emerald-400 transition-colors font-light">About</a>
              <a href="#contact" className="text-white/70 hover:text-emerald-400 transition-colors font-light">Contact</a>
            </nav>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-white/50 tracking-wide mb-1">
                &copy; 2024 PRIMESKY EAST AFRICA
              </p>
              <p className="text-xs text-emerald-400 tracking-wider">
                LICENSE: XK-RPI-0663A
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;