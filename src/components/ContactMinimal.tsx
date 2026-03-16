import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactMinimal = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    const subject = encodeURIComponent(`Inquiry from ${formData.email}`);
    const body = encodeURIComponent(formData.message);
    window.open(`mailto:primeskyeastafrica@yahoo.com?subject=${subject}&body=${body}`, '_blank');
    
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="py-60 bg-black text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <img src="https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/%23tanzanai.jpg" className="w-full h-full object-cover blur-3xl scale-125" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end">
          <div className="space-y-20">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-8xl md:text-[14vw] font-black tracking-tighter leading-[0.7] mb-12 uppercase italic"
            >
              START <br/>
              <span className="text-emerald-500 not-italic">NOW.</span>
            </motion.h2>
            
            <div className="flex flex-wrap gap-12">
              {[
                { label: 'EMAIL', val: 'primeskyeastafrica@yahoo.com', href: 'mailto:primeskyeastafrica@yahoo.com' },
                { label: 'WA', val: '+254 712 345 678', href: 'https://wa.me/254712345678' }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                  data-cursor="Link"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black block mb-4">{item.label}</span>
                  <span className="text-3xl font-black text-white/20 group-hover:text-white transition-colors tracking-tighter uppercase italic">{item.val.split('@')[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="group border-b border-white/5 focus-within:border-emerald-500 transition-colors py-4">
                <input
                  type="email"
                  placeholder="IDENTITY"
                  required
                  className="w-full bg-transparent text-4xl font-black uppercase italic tracking-tighter outline-none placeholder:text-neutral-900"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="group border-b border-white/5 focus-within:border-emerald-500 transition-colors py-4">
                <textarea
                  placeholder="THE VISION"
                  required
                  rows={2}
                  className="w-full bg-transparent text-4xl font-black uppercase italic tracking-tighter outline-none placeholder:text-neutral-900 resize-none"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="Connect"
                className="w-full py-8 bg-white text-black font-black uppercase italic tracking-[0.5em] text-[10px] rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-2xl"
              >
                {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'RECEIVED' : 'INITIATE SYNC'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMinimal;
