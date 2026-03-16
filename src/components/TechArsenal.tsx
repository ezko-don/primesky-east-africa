import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Camera, Radio } from 'lucide-react';

const TechArsenal = () => {
  const equipment = [
    {
      name: "Inspire 3",
      specs: "8K ProRES RAW • Full Frame",
      desc: "The pinnacle of aerial cinematography.",
      icon: Zap
    },
    {
      name: "RED V-RAPTOR",
      specs: "8K VV 120FPS • 17+ Stops DR",
      desc: "Ground-based cinematic mastery.",
      icon: Camera
    },
    {
      name: "Mavic 3 Pro",
      specs: "Hasselblad Optics • Triple Cam",
      desc: "Versatile precision for tight spaces.",
      icon: Cpu
    },
    {
      name: "FPV Custom",
      specs: "90mph • 4K 60FPS • Gyroflow",
      desc: "Immersive, high-speed dynamic flow.",
      icon: Radio
    }
  ];

  return (
    <section className="py-60 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-32 space-y-8">
          <span className="text-emerald-500 font-black tracking-[1em] uppercase text-[10px]">The Arsenal.</span>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic">
            ELITE <br/>
            <span className="text-emerald-500 not-italic">INSTRUMENTS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipment.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              data-cursor="Specs"
              className="group relative p-12 bg-neutral-900 border border-white/5 rounded-[3rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-700"
            >
              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700">
                  <item.icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{item.name}</h3>
                  <p className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-4">{item.specs}</p>
                  <p className="text-white/30 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechArsenal;
