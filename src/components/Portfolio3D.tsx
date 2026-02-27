import React, { useState, useEffect, useRef } from 'react';
import { X, Play } from 'lucide-react';
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
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mediaItems: MediaItem[] = [
    // Weddings
    { filename: 'weddings/martin---and-brenda---met-on-facebook-in-2021--their-marriage-began-with-a-dm-and-blossomed-into-a-beautiful-interracial-love-story--congratulations--blackmelanini---martin-full-trailer-on-youtube--link-in-bio--decor--crownandtiaraeventske--1769767950870-26wp80.mp4', title: 'Martin & Brenda', category: 'weddings', type: 'video' },
    { filename: 'weddings/sandor---grace-1769767898872-o3akb1.mp4', title: 'Sandor & Grace', category: 'weddings', type: 'video' },
    { filename: 'weddings/The love ❤️🇨🇲 @georgeajr_ & 🇰🇪 @sallykyale 💍 .mp4', title: 'International Love', category: 'weddings', type: 'video' },
    { filename: 'weddings/time7447-1769768024030-qdo65v.jpg', title: 'Wedding Moments', category: 'weddings', type: 'image' },
    // Nature
    { filename: 'Nature/#tanzanai.jpg', title: 'Tanzania', category: 'nature', type: 'image' },
    { filename: 'Nature/IMG_4391.jpg', title: 'Aerial View', category: 'nature', type: 'image' },
    { filename: 'Nature/L A K E  N A T R O N.mp4', title: 'Lake Natron', category: 'nature', type: 'video' },
    { filename: 'Nature/Rice farms view.jpg', title: 'Rice Farms', category: 'nature', type: 'image' },
    { filename: 'Nature/Serengeti - The vast plains .mp4', title: 'Serengeti', category: 'nature', type: 'video' },
    { filename: 'Nature/Shades Of Green    Arusha, Tanzania.mp4', title: 'Arusha', category: 'nature', type: 'video' },
    { filename: 'Nature/Take a few seconds to breath .mp4', title: 'Peaceful', category: 'nature', type: 'video' },
    { filename: 'Nature/The Torch Tower in Arusha, Tanzania, is a symbolic structure commemorating the ideals of freedom.jpg', title: 'Torch Tower', category: 'nature', type: 'image' },
    { filename: 'Nature/The view of mount meru crater.mp4', title: 'Mount Meru', category: 'nature', type: 'video' },
    { filename: 'Nature/seregeti..heic', title: 'Serengeti', category: 'nature', type: 'image' },
    // Real Estate
    { filename: 'Real estate/Zanzibar.jpg', title: 'Zanzibar', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/Zanzibar1.jpg', title: 'Zanzibar Views', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/Zanzibar2.jpg', title: 'Coastal Property', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/Zanzibar3.jpg', title: 'Island Estate', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/Zanzibar4.jpg', title: 'Beach Property', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/Zanzibar5.jpg', title: 'Ocean View', category: 'real-estate', type: 'image' },
    { filename: 'Real estate/muthusovereignsuites.mp4', title: 'Muthu Sovereign', category: 'real-estate', type: 'video' },
    // Construction
    { filename: 'Construction/MUONEKANO WA JUU WA MJI WA SERIKALI MTUMBA DODOMA.mp4', title: 'Dodoma', category: 'construction', type: 'video' },
    { filename: 'Construction/Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4', title: 'Blu Pearl', category: 'construction', type: 'video' },
    { filename: 'Construction/Over a year of construction .mp4', title: 'Construction Progress', category: 'construction', type: 'video' },
    { filename: 'Construction/construction.mp4', title: 'Development', category: 'construction', type: 'video' },
    // Agriculture
    { filename: 'Farm/Farm.jpg', title: 'Farmland', category: 'agriculture', type: 'image' },
    { filename: 'Farm/Farm1.jpg', title: 'Agriculture', category: 'agriculture', type: 'image' },
    { filename: 'Farm/Farm2.jpg', title: 'Crops', category: 'agriculture', type: 'image' }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'nature', name: 'Nature' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'construction', name: 'Construction' },
    { id: 'agriculture', name: 'Agriculture' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    setVisibleItems(new Set());
    itemRefs.current = [];
  }, [selectedCategory]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(index));
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [filteredItems.length]);

  const getMediaUrl = (filename: string) => {
    const parts = filename.split('/');
    const encodedParts = parts.map(part => encodeURIComponent(part));
    const encodedPath = encodedParts.join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4" />
            <h2 className="text-6xl md:text-7xl font-extralight text-neutral-900 mb-4 tracking-tight">
              Portfolio
            </h2>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </div>
          
          {/* Modern Category Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 mt-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-neutral-600 hover:bg-white hover:shadow-md border border-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const mediaUrl = getMediaUrl(item.filename);
            const isVisible = visibleItems.has(index);
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${(index % 3) * 100}ms`,
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : '',
                  perspective: '1000px'
                }}
                onClick={() => setLightboxMedia(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 3D Card with glassmorphism */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  {item.type === 'image' ? (
                    <img
                      src={mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={mediaUrl} type="video/mp4" />
                    </video>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.type === 'video' && (
                      <div className="mb-4 w-16 h-16 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    )}
                    <h3 className="text-white text-xl font-light tracking-wide px-4 text-center">
                      {item.title}
                    </h3>
                    <div className="mt-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                      <span className="text-white/90 text-xs uppercase tracking-widest">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Lightbox */}
      {lightboxMedia && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxMedia(null)}
        >
          <button
            onClick={() => setLightboxMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {lightboxMedia.type === 'image' ? (
                <img
                  src={getMediaUrl(lightboxMedia.filename)}
                  alt={lightboxMedia.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={getMediaUrl(lightboxMedia.filename)} type="video/mp4" />
                </video>
              )}
            </div>
            
            <div className="text-center mt-6 backdrop-blur-sm bg-white/10 rounded-full px-6 py-3 inline-block">
              <p className="text-white text-lg font-light tracking-wide">
                {lightboxMedia.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio3D;
