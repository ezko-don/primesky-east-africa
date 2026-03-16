import React, { useState } from 'react';
import { Play, Filter, Video, Image, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { R2_CONFIG } from '@/config/r2';

interface MediaItem {
  filename: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  description: string;
}

const PortfolioPublic = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // All media files from R2 bucket
  const mediaItems: MediaItem[] = [
    // Weddings
    {
      filename: 'weddings/martin---and-brenda---met-on-facebook-in-2021--their-marriage-began-with-a-dm-and-blossomed-into-a-beautiful-interracial-love-story--congratulations--blackmelanini---martin-full-trailer-on-youtube--link-in-bio--decor--crownandtiaraeventske--1769767950870-26wp80.mp4',
      title: 'Martin & Brenda Love Story',
      category: 'weddings',
      type: 'video',
      description: 'Beautiful interracial love story from Facebook to marriage'
    },
    {
      filename: 'weddings/sandor---grace-1769767898872-o3akb1.mp4',
      title: 'Sandor & Grace Wedding',
      category: 'weddings',
      type: 'video',
      description: 'Beautiful wedding ceremony'
    },
    {
      filename: 'weddings/The love ❤️🇨🇲 @georgeajr_ & 🇰🇪 @sallykyale 💍 .mp4',
      title: 'International Love Story',
      category: 'weddings',
      type: 'video',
      description: 'Cross-cultural romance between Cameroon and Kenya'
    },
    {
      filename: 'weddings/time7447-1769768024030-qdo65v.jpg',
      title: 'Wedding Photography',
      category: 'weddings',
      type: 'image',
      description: 'Professional wedding photography'
    },

    // Nature
    {
      filename: 'Nature/#tanzanai.jpg',
      title: 'Tanzania Beauty',
      category: 'nature',
      type: 'image',
      description: 'Scenic beauty of Tanzania'
    },
    {
      filename: 'Nature/IMG_4391.jpg',
      title: 'Aerial Photography',
      category: 'nature',
      type: 'image',
      description: 'Professional aerial photography'
    },
    {
      filename: 'Nature/L A K E  N A T R O N.mp4',
      title: 'Lake Natron',
      category: 'nature',
      type: 'video',
      description: 'Breathtaking views of Lake Natron'
    },
    {
      filename: 'Nature/Rice farms view.jpg',
      title: 'Rice Farms',
      category: 'nature',
      type: 'image',
      description: 'Aerial view of rice farming fields'
    },
    {
      filename: 'Nature/Serengeti - The vast plains .mp4',
      title: 'Serengeti Plains',
      category: 'nature',
      type: 'video',
      description: 'Endless plains of the Serengeti'
    },
    {
      filename: 'Nature/Shades Of Green    Arusha, Tanzania.mp4',
      title: 'Green Arusha',
      category: 'nature',
      type: 'video',
      description: 'Lush landscapes of Arusha, Tanzania'
    },
    {
      filename: 'Nature/Take a few seconds to breath .mp4',
      title: 'Peaceful Moments',
      category: 'nature',
      type: 'video',
      description: 'Serene aerial meditation'
    },
    {
      filename: 'Nature/The Torch Tower in Arusha, Tanzania, is a symbolic structure commemorating the ideals of freedom.jpg',
      title: 'Torch Tower Arusha',
      category: 'nature',
      type: 'image',
      description: 'Iconic Torch Tower symbolizing freedom'
    },
    {
      filename: 'Nature/The beauty of the crater with the majestic Mount Meru towering in the background. This view never gets old! What do you love most about the landscape here#meru #tanzaniaexplorer #airialphotography #minidrone #crater #landscape #old #djiglob.mp4',
      title: 'Mount Meru Crater',
      category: 'nature',
      type: 'video',
      description: 'Majestic Mount Meru and crater views'
    },
    {
      filename: 'Nature/seregeti..heic',
      title: 'Serengeti Wildlife',
      category: 'nature',
      type: 'image',
      description: 'Wildlife photography in Serengeti'
    },
    {
      filename: 'Nature/zenji.mp4',
      title: 'Zenji Beach',
      category: 'nature',
      type: 'video',
      description: 'Beautiful beach resort views'
    },

    // Real Estate
    {
      filename: 'Real estate/trip to Zanzibar.🇹🇿🏝️🏖️.jpg',
      title: 'Zanzibar Island Beauty',
      category: 'real-estate',
      type: 'image',
      description: 'Tropical paradise from the sky'
    },
    {
      filename: 'Real estate/All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (1).jpg',
      title: 'Zanzibar Paradise View 1',
      category: 'real-estate',
      type: 'image',
      description: 'Stunning aerial view of Zanzibar beaches'
    },
    {
      filename: 'Real estate/All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (2).jpg',
      title: 'Zanzibar Paradise View 2',
      category: 'real-estate',
      type: 'image',
      description: 'Crystal clear waters of Zanzibar'
    },
    {
      filename: 'Real estate/Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4',
      title: 'Blu Pearl Villa',
      category: 'real-estate',
      type: 'video',
      description: '2 bedroom villa construction at Blu Pearl'
    },
    {
      filename: 'Real estate/masaki .mov',
      title: 'Masaki Properties',
      category: 'real-estate',
      type: 'video',
      description: 'Premium properties in Masaki area'
    },
    {
      filename: 'Real estate/muthusovereignsuites.mp4',
      title: 'Muthu Sovereign Suites',
      category: 'real-estate',
      type: 'video',
      description: 'Luxury hotel and suites aerial tour'
    },

    // Construction
    {
      filename: 'Construction/MUONEKANO WA JUU WA MJI WA SERIKALI MTUMBA DODOMA.mp4',
      title: 'Dodoma Government City',
      category: 'construction',
      type: 'video',
      description: 'Aerial view of government city development in Dodoma'
    },
    {
      filename: 'Construction/Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4',
      title: 'Blu Pearl Construction',
      category: 'construction',
      type: 'video',
      description: 'Villa construction progress at Blu Pearl'
    },
    {
      filename: 'Construction/Over a year of construction .mp4',
      title: 'Year-Long Construction',
      category: 'construction',
      type: 'video',
      description: 'Time-lapse of construction progress'
    },
    {
      filename: 'Construction/construction.mp4',
      title: 'Construction Progress',
      category: 'construction',
      type: 'video',
      description: 'Aerial view of construction development'
    },

    // Agriculture
    {
      filename: 'Rice farms view.jpg',
      title: 'Farmland Aerial',
      category: 'agriculture',
      type: 'image',
      description: 'Aerial view of rice farming fields'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Work', count: mediaItems.length },
    { id: 'weddings', name: 'Weddings', count: mediaItems.filter(item => item.category === 'weddings').length },
    { id: 'nature', name: 'Nature & Wildlife', count: mediaItems.filter(item => item.category === 'nature').length },
    { id: 'real-estate', name: 'Real Estate', count: mediaItems.filter(item => item.category === 'real-estate').length },
    { id: 'construction', name: 'Construction', count: mediaItems.filter(item => item.category === 'construction').length },
    { id: 'agriculture', name: 'Agriculture', count: mediaItems.filter(item => item.category === 'agriculture').length },
  ].filter(cat => cat.id === 'all' || cat.count > 0);

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  // Construct full R2 public URL with proper encoding
  const getMediaUrl = (filename: string) => {
    // Split the filename into folder and file parts
    const parts = filename.split('/');
    // Encode each part separately to handle special characters
    const encodedParts = parts.map(part => encodeURIComponent(part));
    const encodedPath = encodedParts.join('/');
    return `${R2_CONFIG.PUBLIC_URL}/${encodedPath}`;
  };

  return (
    <section id="portfolio" className="py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Capturing Kenya & Tanzania
            <span className="block text-emerald-400">From Above</span>
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Professional drone photography and videography showcasing the beauty of East Africa. 
            From intimate weddings to vast landscapes, every frame tells a story.
          </p>
          <p className="text-sm text-emerald-400">
            Powered by Cloudflare R2 • {mediaItems.length} media files
          </p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white border border-white/5'
              }`}
            >
              <Filter className={`w-4 h-4 ${selectedCategory === category.id ? 'animate-pulse' : ''}`} />
              <span className="tracking-wide">{category.name}</span>
              <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredItems.map((item, index) => {
              const mediaUrl = getMediaUrl(item.filename);
              
              return (
                <motion.div
                  key={item.filename}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 border border-white/5"
                >
                  <div className="aspect-[4/3] bg-black relative overflow-hidden">
                    {item.type === 'image' ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onLoad={() => console.log('✅ Image loaded:', item.title)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/800x600/1f2937/10b981?text=Image+Not+Found';
                        }}
                      />
                    ) : (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                      >
                        <source src={mediaUrl} type="video/mp4" />
                        <source src={mediaUrl} type="video/quicktime" />
                      </video>
                    )}
                    
                    {/* Media type badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <motion.span 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md ${
                        item.type === 'video' 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-emerald-500/80 text-white'
                      }`}>
                        {item.type === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                        {item.type.toUpperCase()}
                      </motion.span>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold rounded-lg uppercase tracking-wider"
                      >
                        {item.category.replace('-', ' ')}
                      </motion.span>
                    </div>

                    {/* Play button overlay for videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <motion.div 
                          whileHover={{ scale: 1.2 }}
                          className="bg-emerald-500/20 rounded-full p-6 backdrop-blur-sm border border-emerald-500/30"
                        >
                          <Play className="w-10 h-10 text-emerald-400 fill-emerald-400/20" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">
                      {item.description}
                    </p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{item.category}</span>
                      </div>
                      
                      <motion.a
                        whileHover={{ x: 3 }}
                        href={mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-colors uppercase tracking-widest"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Capture Your Story?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let us bring your vision to life with professional drone photography and videography services across Kenya and Tanzania.
            </p>
            <a 
              href="#contact"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPublic;
