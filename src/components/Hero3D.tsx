import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { R2_CONFIG } from '@/config/r2';

const Hero3D = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const getMediaUrl = (filename: string) => {
    const parts = filename.split('/');
    const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };

  const media = [
    { type: 'video', filename: 'Nature/L A K E  N A T R O N.mp4' },
    { type: 'image', filename: 'Nature/Rice farms view.jpg' },
    { type: 'video', filename: 'Nature/Shades Of Green    Arusha, Tanzania.mp4' },
    { type: 'image', filename: 'Real estate/trip to Zanzibar.🇹🇿🏝️🏖️.jpg' },
    { type: 'video', filename: 'Nature/The beauty of the crater with the majestic Mount Meru towering in the background. This view never gets old! What do you love most about the landscape here#meru #tanzaniaexplorer #airialphotography #minidrone #crater #landscape #old #djiglob.mp4' },
    { type: 'image', filename: 'Nature/IMG_4391.jpg' },
    { type: 'video', filename: 'Nature/zenji.mp4' },
    { type: 'image', filename: 'Nature/#tanzanai.jpg' },
    { type: 'video', filename: 'Construction/Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4' },
    { type: 'video', filename: 'Real estate/masaki .mov' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % media.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [media.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900">
      {/* Immersive Background */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-neutral-900"
        >
          {media[currentSlide].type === 'video' ? (
            <video
              src={getMediaUrl(media[currentSlide].filename)}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="h-full w-full object-cover brightness-[0.75]"
              style={{ transform: 'scale(1.1)' }}
            />
          ) : (
            <motion.img
              initial={{ scale: 1.1, x: -20 }}
              animate={{ scale: 1.3, x: 20 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              src={getMediaUrl(media[currentSlide].filename)}
              alt="Slide"
              className="h-full w-full object-cover brightness-[0.75]"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* 3D Typography Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", damping: 40, stiffness: 80 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col items-center"
          >
             <div className="h-px w-20 bg-emerald-500/50 mb-6" />
             <span className="text-[10px] uppercase font-black tracking-[1em] text-emerald-500">
               Aerial Cinematography
             </span>
          </motion.div>
          
          <h1 
            className="text-7xl md:text-[14vw] font-black tracking-tighter leading-[0.75] mb-12 select-none uppercase mix-blend-plus-lighter"
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              color: 'transparent'
            }}
          >
            PRIME<br/>
            <span 
              className="text-emerald-500 italic opacity-20"
              style={{ WebkitTextStroke: '0px' }}
            >
              SKY.
            </span>
          </h1>

          <div className="flex items-center justify-center gap-12">
            <motion.button
              whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portfolio')}
              data-cursor="Enter"
              className="px-16 py-6 rounded-full bg-white text-black text-[10px] uppercase font-black tracking-[0.3em] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:bg-emerald-500 hover:text-white transition-all duration-700"
            >
              Explore Works
            </motion.button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              data-cursor={isMuted ? "Unmute" : "Mute"}
              className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all group backdrop-blur-md"
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-white/50 group-hover:text-white" /> : <Volume2 className="w-6 h-6 text-emerald-500" />}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Modern Indicators */}
      <div className="absolute bottom-16 left-16 flex items-end gap-6 z-20">
        {media.map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div 
              className={`w-[2px] transition-all duration-1000 ease-out rounded-full ${
                i === currentSlide ? 'h-16 bg-emerald-500' : 'h-4 bg-white/10'
              }`}
            />
            <span className={`text-[8px] font-black transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100 text-emerald-500' : 'opacity-0 text-white/10'}`}>
              0{i + 1}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-16 right-16 z-20 flex flex-col items-end gap-4">
        <div className="flex gap-4 mb-4">
           {['INSTA', 'VIMEO', 'FB'].map(social => (
             <span key={social} className="text-[8px] font-black tracking-widest text-white/20 hover:text-emerald-500 cursor-pointer transition-colors">{social}</span>
           ))}
        </div>
        <p className="text-[8px] uppercase tracking-[0.8em] text-white/30 font-black">
          Licensed Precision • 2024
        </p>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-8 border border-white/5 pointer-events-none z-30 rounded-[2rem]" />
    </section>
  );
};

export default Hero3D;
