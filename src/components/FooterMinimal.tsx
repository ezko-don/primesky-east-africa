import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterMinimal = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 bg-black text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/primesky-logo.png" 
                  alt="Logo" 
                  className="h-12 w-12 object-contain invert brightness-125 mix-blend-screen" 
                />
                <span className="text-[12px] font-black tracking-[0.8em] text-white uppercase">PRIME<span className="text-emerald-500">SKY</span></span>
             </div>
             <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Licensed Aerial precision.</p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: Instagram, href: "https://instagram.com/primeskyeastafrica" },
              { icon: Facebook, href: "https://facebook.com/primeskyeastafrica" },
              { icon: Twitter, href: "https://twitter.com/primeskyea" },
              { icon: Mail, href: "mailto:primeskyeastafrica@yahoo.com" }
            ].map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -4, scale: 1.1 }}
                href={item.href}
                data-cursor="Connect"
                className="text-white/20 hover:text-emerald-500 transition-all"
              >
                <item.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[8px] uppercase tracking-[0.6em] text-white/10 font-black italic">
© {currentYear} PRIMESKY • EXCELLENCE FROM ABOVE.
           </p>
           <div className="flex gap-12">
              {['Instagram', 'WhatsApp', 'Email'].map((l) => (
                <a key={l} href="#" className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/20 hover:text-white transition-colors">{l}</a>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
