import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Film, Send } from 'lucide-react';
import { R2_CONFIG } from '@/config/r2';

const ProcessTerminal = () => {
  const getMediaUrl = (filename: string) => {
    const parts = filename.split('/');
    const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };

  const steps = [
    { 
      icon: Search, 
      id: "01",
      title: "SCOUT", 
      desc: "Strategic site analysis and vision mapping.",
      visual: "Nature/Rice farms view.jpg"
    },
    { 
      icon: Zap, 
      id: "02",
      title: "CAPTURE", 
      desc: "Precision raw data acquisition in 8K.",
      visual: "Nature/The beauty of the crater with the majestic Mount Meru towering in the background. This view never gets old! What do you love most about the landscape here#meru #tanzaniaexplorer #airialphotography #minidrone #crater #landscape #old #djiglob.mp4"
    },
    { 
      icon: Film, 
      id: "03",
      title: "MASTER", 
      desc: "Color grading and narrative assembly.",
      visual: "Nature/zenji.mp4"
    },
    { 
      icon: Send, 
      id: "04",
      title: "SYNC", 
      desc: "Instant edge delivery via R2 network.",
      visual: "Nature/L A K E  N A T R O N.mp4"
    }
  ];

  return (
    <section id="process" className="py-60 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-32 items-start">
           <div className="sticky top-40 w-full lg:w-1/2 space-y-12">
              <span className="text-emerald-500 font-black tracking-[1em] uppercase text-[10px] block mb-4">The Logic</span>
              <h2 className="text-8xl md:text-[14vw] font-black text-white tracking-tighter leading-[0.7] uppercase italic">
                RAW <br/>
                <span className="text-emerald-500 not-italic">SYNC.</span>
              </h2>
              <div className="h-px w-40 bg-white/10" />
           </div>

           <div className="w-full lg:w-1/2 space-y-40">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative"
                >
                   <div className="space-y-8">
                      <div className="flex items-center gap-6">
                         <span className="text-6xl font-black text-white/5 group-hover:text-emerald-500 transition-colors duration-700 italic">{step.id}</span>
                         <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">{step.title}</h3>
                      </div>
                      
                      <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/5 mb-8">
                         {step.visual.endsWith('.mp4') ? (
                           <video src={getMediaUrl(step.visual)} autoPlay muted loop className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                         ) : (
                           <img src={getMediaUrl(step.visual)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                         )}
                         <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                      </div>

                      <p className="text-white/40 text-2xl font-light italic leading-relaxed group-hover:text-white transition-colors duration-700">
                        {step.desc}
                      </p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTerminal;
