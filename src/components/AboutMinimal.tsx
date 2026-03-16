import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { R2_CONFIG } from '@/config/r2';

const AboutMinimal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const getMediaUrl = (filename: string) => {
    const parts = filename.split('/');
    const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section id="about" ref={containerRef} className="min-h-screen py-60 bg-black overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row gap-32 items-center">
          {/* Visual Shutter */}
          <motion.div 
            initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-3/5"
            data-cursor="Discover"
          >
            <div className="relative aspect-video overflow-hidden rounded-[4rem] group border border-white/5">
              <motion.img
                style={{ scale }}
                src={getMediaUrl('Nature/IMG_4391.jpg')}
                alt="Perspective"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12">
                 <p className="text-[10px] font-black tracking-[1em] text-emerald-500 uppercase">AERIAL MASTER</p>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-2/5 text-left">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-8xl md:text-[10vw] font-black text-white tracking-tighter leading-[0.75] uppercase italic">
                ZERO <br/>
                <span className="text-emerald-500 not-italic">LIMITS.</span>
              </h2>
              
              <p className="text-2xl font-light text-white/30 leading-tight max-w-sm italic">
                Surgical precision. <br/>
                <span className="text-white not-italic">Unrivaled perspective.</span>
              </p>

              <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-t border-white/10 pt-12">
                {[
                  { val: 'L-01', lab: 'LICENSED' },
                  { val: '8K', lab: 'NATIVE' },
                  { val: '24/7', lab: 'DEPLOY' },
                  { val: '0ms', lab: 'LAG' }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-5xl font-black text-white mb-2 italic tracking-tighter">{stat.val}</p>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-emerald-500 font-black">{stat.lab}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMinimal;
