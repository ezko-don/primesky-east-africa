import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { R2_CONFIG } from '@/config/r2';

const CinematicShowreel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const getMediaUrl = (filename: string) => {
    const parts = filename.split('/');
    const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["100px", "0px"]);

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-black overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ scale, borderRadius }}
        className="relative w-full h-[100vh] overflow-hidden group shadow-2xl"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover brightness-[0.4] grayscale group-hover:grayscale-0 group-hover:brightness-[0.7] transition-all duration-[2000ms] ease-out"
        >
          <source src={getMediaUrl('Nature/Serengeti - The vast plains .mp4')} type="video/mp4" />
        </video>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="space-y-8"
           >
              <span className="text-emerald-500 font-black tracking-[1em] uppercase text-[10px] block mb-4">Prime Sky Production</span>
              <h2 className="text-6xl md:text-[8vw] font-black text-white tracking-tighter leading-none uppercase italic">
                A Vision <br/>
                <span className="text-emerald-500 not-italic">Unmatched.</span>
              </h2>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center gap-6 mt-12 cursor-pointer group/play"
                data-cursor="Play"
              >
                 <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-3xl group-hover/play:bg-emerald-500 group-hover/play:border-emerald-500 transition-all duration-700">
                    <Play className="w-8 h-8 text-white fill-white" />
                 </div>
                 <div className="text-left">
                    <p className="text-white font-black uppercase text-[10px] tracking-widest">Watch Showreel</p>
                    <p className="text-white/30 text-[8px] uppercase font-bold tracking-widest">2:45 MINS • 4K UHD</p>
                 </div>
              </motion.div>
           </motion.div>
        </div>

        {/* Cinematic Specs Grid (Moving with parallax) */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
          className="absolute bottom-20 left-20 right-20 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12"
        >
           {[
             { label: 'Cinematic Flow', val: '24 FPS Native' },
             { label: 'Color Depth', val: '12-BIT RAW' },
             { label: 'Stabilization', val: 'Zenith II' },
             { label: 'Resolution', val: '8K Mastery' }
           ].map((spec, i) => (
             <div key={i} className="space-y-2 opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                <p className="text-[8px] uppercase font-black tracking-widest text-emerald-500">{spec.label}</p>
                <p className="text-xl font-black text-white">{spec.val}</p>
             </div>
           ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CinematicShowreel;
