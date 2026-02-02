import React from 'react';
import { Shield, Award, Camera, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-32 bg-neutral-800 text-white">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <Camera className="w-12 h-12 text-emerald-400" />
                <div className="h-px w-16 bg-emerald-400"></div>
                <span className="text-emerald-400 font-light tracking-widest text-sm">ABOUT US</span>
                <div className="h-px w-16 bg-emerald-400"></div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-light tracking-wide text-white mb-6">
              WHO <span className="text-emerald-400">WE ARE</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-light tracking-wide text-white mb-6">
                Professional Drone Services
              </h3>
              <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
                PrimeSky East Africa is a licensed drone service provider operating across Kenya with 
                Remote Pilot Licence <span className="text-emerald-400 font-medium">XK-RPI-0663A</span>. We specialize in professional aerial photography, 
                videography, mapping, and documentation services.
              </p>
              <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
                Our expertise extends far beyond breathtaking aerial photography. We have produced, 
                directed and featured in commercial drone content from all around Kenya, working 
                closely with a wide variety of internationally acclaimed clients.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-light text-emerald-400 mb-2">50+</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-emerald-400 mb-2">5+</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">Years</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-neutral-700/50 border border-neutral-600 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-emerald-400 mr-4" />
                  <h4 className="text-xl font-light tracking-wide text-white">
                    Licensed & Certified
                  </h4>
                </div>
                <p className="text-white/70 font-light">
                  Remote Pilot Licence: XK-RPI-0663A<br />
                  Fully insured and compliant with Kenyan aviation regulations
                </p>
              </div>
              
              <div className="bg-neutral-700/50 border border-neutral-600 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mr-4" />
                  <h4 className="text-xl font-light tracking-wide text-white">
                    Safety First
                  </h4>
                </div>
                <p className="text-white/70 font-light">
                  All operations conducted with strict adherence to safety protocols 
                  and regulatory compliance standards
                </p>
              </div>
              
              <div className="bg-neutral-700/50 border border-neutral-600 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-emerald-400 mr-4" />
                  <h4 className="text-xl font-light tracking-wide text-white">
                    Professional Quality
                  </h4>
                </div>
                <p className="text-white/70 font-light">
                  4K video recording, high-resolution photography, and precision 
                  mapping capabilities for all project requirements
                </p>
              </div>
            </div>
          </div>
          
          {/* Mission Statement */}
          <div className="text-center bg-neutral-700/30 border border-neutral-600 rounded-2xl p-12">
            <h3 className="text-3xl font-light text-white mb-6">Our Mission</h3>
            <p className="text-xl text-white/70 font-light max-w-4xl mx-auto leading-relaxed">
              To provide exceptional aerial photography and videography services that capture 
              the beauty and essence of East Africa from above, while maintaining the highest 
              standards of safety, professionalism, and regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;