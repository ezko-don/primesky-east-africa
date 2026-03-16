import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '254741464497';
    const message = encodeURIComponent("Hello! I'm interested in your drone services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-neutral-900 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-2xl"
          >
            <div className="bg-emerald-500 p-8">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <button onClick={() => setIsExpanded(false)} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
               </div>
               <h3 className="text-white font-black uppercase tracking-tighter text-2xl">Direct <br/>Line.</h3>
            </div>
            
            <div className="p-8 space-y-6">
              <p className="text-white/40 text-sm font-light leading-relaxed">
                Connect directly with our flight operations team for scheduling and technical inquiries.
              </p>
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-between py-4 px-6 bg-white/5 border border-white/5 rounded-2xl text-white hover:bg-emerald-500 transition-all group"
              >
                <span className="text-[10px] uppercase font-black tracking-widest">Open WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        data-cursor="Chat"
        className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 relative"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
        <MessageCircle className="w-6 h-6 relative z-10" />
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
