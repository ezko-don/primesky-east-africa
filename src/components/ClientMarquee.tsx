import React from 'react';
import { motion } from 'framer-motion';

const ClientMarquee = () => {
  const clients = [
    "Construction Co.", "Serengeti Safaris", "Luxury Zanzibar", "Urban Dev Group", 
    "AgriSolutions", "Kenya Wildlife", "Royal Weddings", "Skyline Real Estate"
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
      <div className="flex flex-col items-center gap-12">
        <span className="text-[10px] uppercase font-black tracking-[0.8em] text-white/20">Trusted by Visionaries</span>
        
        <div className="relative flex overflow-x-hidden w-full">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="flex items-center gap-12 px-12">
                 <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
                 <span className="text-4xl md:text-6xl font-black text-white/10 hover:text-emerald-500 transition-colors duration-500 uppercase italic tracking-tighter">
                   {client}
                 </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
