import React, { useState } from 'react';
import { Camera, Video, Sprout, Building, Heart, ArrowUpRight, Monitor, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Services3D = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    { 
      id: "01",
      icon: Video, 
      title: 'CINematic', 
      desc: 'Narrative-driven 4K/6K visual storytelling with filmic precision.',
      tags: ['8K RAW', 'COMMERCIAL'],
      thumbnail: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/Serengeti%20-%20The%20vast%20plains%20.mp4'
    },
    { 
      id: "02",
      icon: Building, 
      title: 'INTELLigence', 
      desc: 'High-precision drone mapping and thermal site monitoring.',
      tags: ['RTK GPS', 'THERMAL'],
      thumbnail: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Construction/construction.mp4'
    },
    { 
      id: "03",
      icon: Sprout, 
      title: 'AGRIculture', 
      desc: 'Multispectral crop health analysis and yield optimization data.',
      tags: ['MAPS', 'NDVI'],
      thumbnail: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/Rice%20farms%20view.jpg'
    },
    { 
      id: "04",
      icon: Camera, 
      title: 'PRESERVation', 
      desc: 'Master-level preservation of life\'s most profound moments.',
      tags: ['4K UHD', 'WEDDINGS'],
      thumbnail: 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/zenji.mp4'
    }
  ];

  return (
    <section id="services" className="py-60 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40"
        >
          <span className="text-emerald-500 font-black tracking-[0.8em] uppercase text-[10px] mb-6 block">Capabilities</span>
          <h2 className="text-8xl md:text-[12vw] font-black leading-[0.75] tracking-tighter text-white uppercase italic">
            THE ART OF <br/>
            <span className="text-emerald-500 not-italic">VANTAGE.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              data-cursor="View"
              className="group relative"
            >
              <div className="relative z-10 py-16 border-t border-white/10 flex flex-col lg:flex-row lg:items-center gap-12 cursor-pointer overflow-hidden transition-all duration-700 hover:px-12">
                {/* Number */}
                <span className="text-2xl font-black text-white/5 group-hover:text-emerald-500 transition-colors duration-500 italic">
                  {service.id}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter transition-all duration-700 group-hover:translate-x-8">
                    {service.title}
                  </h3>
                  
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                         initial={{ height: 0, opacity: 0, y: 10 }}
                         animate={{ height: 'auto', opacity: 1, y: 0 }}
                         exit={{ height: 0, opacity: 0, y: 10 }}
                         className="overflow-hidden"
                      >
                         <p className="text-white/40 max-w-xl text-xl font-light leading-relaxed my-8 italic">
                           {service.desc}
                         </p>
                         <div className="flex flex-wrap gap-4">
                            {service.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-black tracking-widest text-emerald-500/60 border-b border-emerald-500/20">
                                {tag}
                              </span>
                            ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover Visual Thumbnail */}
                <div className="absolute right-32 top-1/2 -translate-y-1/2 w-64 aspect-video overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100 hidden lg:block border border-white/10">
                   {service.thumbnail.endsWith('.mp4') ? (
                     <video src={service.thumbnail} autoPlay muted loop className="w-full h-full object-cover" />
                   ) : (
                     <img src={service.thumbnail} className="w-full h-full object-cover" />
                   )}
                </div>

                <ArrowUpRight className="w-16 h-16 text-white/5 transition-all duration-700 group-hover:text-emerald-500 group-hover:rotate-45" />

                {/* Background Reflection */}
                <div className="absolute inset-0 bg-emerald-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 -z-10" />
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>

        {/* Technical Badges */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: 'Dynamic Range', value: '14+ Stops', icon: Zap },
             { label: 'Output Res', value: '8K Native', icon: Monitor },
             { label: 'Precision', value: 'GPS Sync', icon: Zap },
             { label: 'Response', value: '24hr Sync', icon: Zap }
           ].map((badge, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="p-8 border border-white/5 rounded-3xl bg-white/[0.02]"
             >
                <div className="h-2 w-2 rounded-full bg-emerald-500 mb-6 animate-pulse" />
                <p className="text-[10px] uppercase font-black tracking-widest text-white/30 mb-2">{badge.label}</p>
                <p className="text-2xl font-black text-white">{badge.value}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Services3D;

