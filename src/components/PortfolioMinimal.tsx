import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { R2_CONFIG } from '@/config/r2';

interface MediaItem {
  filename: string;
  title: string;
  category: string;
  type: 'image' | 'video';
}

const PortfolioMinimal = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mediaItems: MediaItem[] = [
    // Weddings
    {
      filename: 'weddings/martin---and-brenda---met-on-facebook-in-2021--their-marriage-began-with-a-dm-and-blossomed-into-a-beautiful-interracial-love-story--congratulations--blackmelanini---martin-full-trailer-on-youtube--link-in-bio--decor--crownandtiaraeventske--1769767950870-26wp80.mp4',
      title: 'Martin & Brenda',
      category: 'weddings',
      type: 'video'
    },
    {
      filename: 'weddings/sandor---grace-1769767898872-o3akb1.mp4',
      title: 'Sandor & Grace',
      category: 'weddings',
      type: 'video'
    },
    {
      filename: 'weddings/The love ❤️🇨🇲 @georgeajr_ & 🇰🇪 @sallykyale 💍 .mp4',
      title: 'International Love',
      category: 'weddings',
      type: 'video'
    },
    {
      filename: 'weddings/time7447-1769768024030-qdo65v.jpg',
      title: 'Wedding Moments',
      category: 'weddings',
      type: 'image'
    },

    // Nature
    {
      filename: 'Nature/#tanzanai.jpg',
      title: 'Tanzania',
      category: 'nature',
      type: 'image'
    },
    {
      filename: 'Nature/IMG_4391.jpg',
      title: 'Aerial View',
      category: 'nature',
      type: 'image'
    },
    {
      filename: 'Nature/L A K E  N A T R O N.mp4',
      title: 'Lake Natron',
      category: 'nature',
      type: 'video'
    },
    {
      filename: 'Nature/Rice farms view.jpg',
      title: 'Rice Farms',
      category: 'nature',
      type: 'image'
    },
    {
      filename: 'Nature/Serengeti - The vast plains .mp4',
      title: 'Serengeti',
      category: 'nature',
      type: 'video'
    },
    {
      filename: 'Nature/Shades Of Green    Arusha, Tanzania.mp4',
      title: 'Arusha',
      category: 'nature',
      type: 'video'
    },
    {
      filename: 'Nature/Take a few seconds to breath .mp4',
      title: 'Peaceful',
      category: 'nature',
      type: 'video'
    },
    {
      filename: 'Nature/The Torch Tower in Arusha, Tanzania, is a symbolic structure commemorating the ideals of freedom.jpg',
      title: 'Torch Tower',
      category: 'nature',
      type: 'image'
    },
    {
      filename: 'Nature/The view of mount meru crater.mp4',
      title: 'Mount Meru',
      category: 'nature',
      type: 'video'
    },
    {
      filename: 'Nature/seregeti..heic',
      title: 'Serengeti',
      category: 'nature',
      type: 'image'
    },

    // Real Estate
    {
      filename: 'Real estate/Zanzibar.jpg',
      title: 'Zanzibar',
      category: 'real-estate',
      type: 'image'
    },
    {
      filename: 'Real estate/Zanzibar1.jpg',
      title: 'Zanzibar Views',
      category: 'real-estate',
      type: 'image'
    },
    {
      filename: 'Real estate/Zanzibar2.jpg',
      title: 'Coastal Property',
      category: 'real-estate',
      type: 'image'
    },
    {
      filename: 'Real estate/Zanzibar3.jpg',
      title: 'Island Estate',
      category: 'real-estate',
      type: 'image'
    },
    {
      filename: 'Real estate/Zanzibar4.jpg',
      title: 'Beach Property',
      category: 'real-estate',
      type: 'image'
    },
    {
      filename: 'Real estate/Zanzibar5.jpg',
      title: 'Ocean View',
      category: 'real-estate',
      type: 'image'
    },
    {
      filename: 'Real estate/muthusovereignsuites.mp4',
      title: 'Muthu Sovereign',
      category: 'real-estate',
      type: 'video'
    },

    // Construction
    {
      filename: 'Construction/MUONEKANO WA JUU WA MJI WA SERIKALI MTUMBA DODOMA.mp4',
      title: 'Dodoma',
      category: 'construction',
      type: 'video'
    },
    {
      filename: 'Construction/Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4',
      title: 'Blu Pearl',
      category: 'construction',
      type: 'video'
    },
    {
      filename: 'Construction/Over a year of construction .mp4',
      title: 'Construction Progress',
      category: 'construction',
      type: 'video'
    },
    {
      filename: 'Construction/construction.mp4',
      title: 'Development',
      category: 'construction',
      type: 'video'
    },

    // Agriculture
    {
      filename: 'Farm/Farm.jpg',
      title: 'Farmland',
      category: 'agriculture',
      type: 'image'
    },
    {
      filename: 'Farm/Farm1.jpg',
      title: 'Agriculture',
      category: 'agriculture',
      type: 'image'
    },
    {
      filename: 'Farm/Farm2.jpg',
      title: 'Crops',
      category: 'agriculture',
      type: 'image'
    }
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
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-8 tracking-tight">
            Portfolio
          </h2>
          
          {/* Minimal Category Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`uppercase tracking-widest transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? 'text-neutral-900 font-medium border-b-2 border-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Clean Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => {
            const mediaUrl = getMediaUrl(item.filename);
            
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`group relative overflow-hidden bg-neutral-100 cursor-pointer aspect-[4/3] transition-all duration-700 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                onClick={() => setLightboxMedia(item)}
              >
                {item.type === 'image' ? (
                  <img
                    src={mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Title on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-light tracking-wide">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxMedia && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxMedia(null)}
        >
          <button
            onClick={() => setLightboxMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-neutral-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
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
            
            <p className="text-white text-center mt-4 text-lg font-light">
              {lightboxMedia.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioMinimal;
