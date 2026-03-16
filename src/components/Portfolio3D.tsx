import React, { useState } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { R2_CONFIG } from '@/config/r2';

interface MediaItem {
  filename: string;
  title: string;
  category: string;
  type: 'image' | 'video';
}

const Portfolio3D = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);

  const mediaItems: MediaItem[] = [
    // Weddings
    { filename: 'weddings/martin---and-brenda---met-on-facebook-in-2021--their-marriage-began-with-a-dm-and-blossomed-into-a-beautiful-interracial-love-story--congratulations--blackmelanini---martin-full-trailer-on-youtube--link-in-bio--decor--crownandtiaraeventske--1769767950870-26wp80.mp4', title: 'Martin & Brenda', category: 'weddings', type: 'video' },
    { filename: 'weddings/sandor---grace-1769767898872-o3akb1.mp4', title: 'Sandor & Grace', category: 'weddings', type: 'video' },
    { filename: 'weddings/The love ❤️🇨🇲 @georgeajr_ & 🇰🇪 @sallykyale 💍 .mp4', title: 'International Love', category: 'weddings', type: 'video' },
    { filename: 'weddings/time7447-1769768024030-qdo65v.jpg', title: 'Wedding Moments', category: 'weddings', type: 'image' },
    // Nature
    { filename: 'Nature/tanzanai.jpg', title: 'Tanzania', category: 'nature', type: 'image' },
    { filename: 'Nature/IMG_4391.jpg', title: 'Aerial View', category: 'nature', type: 'image' },
    { filename: 'Nature/L A K E  N A T R O N.mp4', title: 'Lake Natron', category: 'nature', type: 'video' },
    { filename: 'Nature/Rice farms view.jpg', title: 'Rice Farms', category: 'nature', type: 'image' },
    { filename: 'Nature/Serengeti - The vast plains .mp4', title: 'Serengeti', category: 'nature', type: 'video' },
    { filename: 'Nature/Shades Of Green    Arusha, Tanzania.mp4', title: 'Arusha', category: 'nature', type: 'video' },
    { filename: 'Nature/Take a few seconds to breath .mp4', title: 'Peaceful', category: 'nature', type: 'video' },
    { filename: 'Nature/The Torch Tower in Arusha, Tanzania, is a symbolic structure commemorating the ideals of freedom.jpg', title: 'Torch Tower', category: 'nature', type: 'image' },
    { filename: 'Nature/The beauty of the crater with the majestic Mount Meru towering in the background. This view never gets old! What do you love most about the landscape here#meru #tanzaniaexplorer #airialphotography #minidrone #crater #landscape #old #djiglob.mp4', title: 'Mount Meru', category: 'nature', type: 'video' },
    { filename: 'Nature/seregeti.jpg', title: 'Serengeti', category: 'nature', type: 'image' },
    { filename: 'Nature/zenji.mp4', title: 'Zanzibar Shores', category: 'nature', type: 'video' },
    // Real Estate
    { filename: 'Real estate/trip to Zanzibar.🇹🇿🏝️🏖️.jpg', title: 'Zanzibar Coast', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (1).jpg', title: 'Zanzibar Resort', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (2).jpg', title: 'Luxury Stay', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/muthusovereignsuites.mp4', title: 'Muthu Sovereign', category: 'real-estate', type: 'video' },
    { filename: 'Real estate/masaki .mov', title: 'Masaki Development', category: 'real-estate', type: 'video' },
    // Construction
    { filename: 'Construction/MUONEKANO WA JUU WA MJI WA SERIKALI MTUMBA DODOMA.mp4', title: 'Dodoma Government City', category: 'construction', type: 'video' },
    { filename: 'Construction/Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4', title: 'Blu Pearl Foundation', category: 'construction', type: 'video' },
    { filename: 'Construction/Over a year of construction .mp4', title: 'Construction Progress', category: 'construction', type: 'video' },
    { filename: 'Construction/construction.mp4', title: 'Development', category: 'construction', type: 'video' },
    // Agriculture
    { filename: 'Rice farms view.jpg', title: 'Farmland Aerial', category: 'agriculture', type: 'image' }
  ];

  const categories = [
    { id: 'all', name: 'Work' },
    { id: 'weddings', name: 'Love' },
    { id: 'nature', name: 'Wild' },
    { id: 'real-estate', name: 'Spaces' },
    { id: 'construction', name: 'Build' },
    { id: 'agriculture', name: 'Grow' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  const getMediaUrl = (filename: string) => {
    const parts = filename.split('/');
    const encodedParts = parts.map(part => encodeURIComponent(part));
    const encodedPath = encodedParts.join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };

  return (
    <section id="portfolio" className="py-40 bg-black min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col md:flex-row items-end justify-between gap-12"
        >
          <div className="max-w-2xl text-left">
             <span className="text-emerald-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Selected Works</span>
             <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
                CRAFTED <br/><span className="text-emerald-500 italic">VISUALLY.</span>
             </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                data-cursor="Filter"
                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-500 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-neutral-500 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.filename}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                onClick={() => setLightboxMedia(item)}
                data-cursor="View"
                className="group relative aspect-square bg-neutral-900 overflow-hidden rounded-[2.5rem] cursor-pointer"
              >
                {item.type === 'image' ? (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={getMediaUrl(item.filename)}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full relative group/video">
                    <video
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseOut={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    >
                      <source src={getMediaUrl(item.filename)} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                       <div className="p-8 rounded-full bg-emerald-500 text-white backdrop-blur-3xl shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-700">
                          <Play className="w-8 h-8 fill-current" />
                       </div>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute inset-x-0 bottom-0 p-12 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <span className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500 mb-4 block">{item.category}</span>
                  <h3 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-50 flex items-center justify-center p-6"
            onClick={() => setLightboxMedia(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-7xl w-full h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-neutral-900 border border-white/5">
                {lightboxMedia.type === 'image' ? (
                  <img
                    src={getMediaUrl(lightboxMedia.filename)}
                    alt={lightboxMedia.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video className="w-full h-full object-contain" controls autoPlay playsInline>
                    <source src={getMediaUrl(lightboxMedia.filename)} type="video/mp4" />
                  </video>
                )}
              </div>
              <button
                onClick={() => setLightboxMedia(null)}
                className="absolute -top-12 -right-12 text-white/30 hover:text-emerald-500 transition-colors hidden md:block"
              >
                <X className="w-12 h-12" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio3D;

