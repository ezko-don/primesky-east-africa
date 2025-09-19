import React, { useState } from 'react';
import { Play, Filter, Video, Image, ExternalLink } from 'lucide-react';

interface MediaItem {
  filename: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  description: string;
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mediaItems: MediaItem[] = [
    // Wedding Videos
    {
      filename: 'EMMA + ANDREY 2.MP4',
      title: 'Emma & Andrey Wedding',
      category: 'weddings',
      type: 'video',
      description: 'Beautiful wedding ceremony captured from above'
    },
    {
      filename: 'sandor + grace.MP4',
      title: 'Sandor & Grace Wedding',
      category: 'weddings',
      type: 'video',
      description: 'Romantic wedding celebration'
    },
    {
      filename: 'Martin   and Brenda   met on Facebook in 2021. Their marriage began with a DM and blossomed into a beautiful interracial love story  Congratulations @blackmelanini & Martin FULL TRAILER ON YOUTUBE (Link in bio) Decor @crownandtiaraeventske .mp4',
      title: 'Martin & Brenda Love Story',
      category: 'weddings',
      type: 'video',
      description: 'Beautiful interracial love story from Facebook to marriage'
    },
    {
      filename: 'The love ❤️🇨🇲 @georgeajr_ & 🇰🇪 @sallykyale 💍 .mp4',
      title: 'International Love Story',
      category: 'weddings',
      type: 'video',
      description: 'Cross-cultural romance between Cameroon and Kenya'
    },

    // Travel & Tourism - Zanzibar
    {
      filename: 'All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (1).jpg',
      title: 'Zanzibar Paradise View 1',
      category: 'travel',
      type: 'image',
      description: 'Stunning aerial view of Zanzibar beaches'
    },
    {
      filename: 'All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (2).jpg',
      title: 'Zanzibar Paradise View 2',
      category: 'travel',
      type: 'image',
      description: 'Crystal clear waters of Zanzibar'
    },
    {
      filename: 'trip to Zanzibar.🇹🇿🏝️🏖️.jpg',
      title: 'Zanzibar Island Beauty',
      category: 'travel',
      type: 'image',
      description: 'Tropical paradise from the sky'
    },
    {
      filename: 'zenji.mp4',
      title: 'Zenji Beach Resort',
      category: 'travel',
      type: 'video',
      description: 'Beautiful beach resort in Zanzibar'
    },

    // Nature & Wildlife
    {
      filename: 'L A K E  N A T R O N.mp4',
      title: 'Lake Natron',
      category: 'nature',
      type: 'video',
      description: 'Breathtaking views of Lake Natron'
    },
    {
      filename: 'Serengeti - The vast plains .mp4',
      title: 'Serengeti Plains',
      category: 'nature',
      type: 'video',
      description: 'Endless plains of the Serengeti'
    },
    {
      filename: 'masai mara.mp4',
      title: 'Masai Mara Safari',
      category: 'nature',
      type: 'video',
      description: 'Wildlife and landscapes of Masai Mara'
    },
    {
      filename: 'Take a few seconds to breath .mp4',
      title: 'Peaceful Moments',
      category: 'nature',
      type: 'video',
      description: 'Serene aerial meditation'
    },
    {
      filename: 'The beauty of the crater with the majestic Mount Meru towering in the background. This view never gets old! What do you love most about the landscape here#meru #tanzaniaexplorer #airialphotography #minidrone #crater #landscape #old #djiglob.mp4',
      title: 'Mount Meru Crater',
      category: 'nature',
      type: 'video',
      description: 'Majestic Mount Meru and crater views'
    },
    {
      filename: 'Shades Of Green    Arusha, Tanzania.mp4',
      title: 'Green Arusha',
      category: 'nature',
      type: 'video',
      description: 'Lush landscapes of Arusha, Tanzania'
    },
    {
      filename: '#tanzanai.jpg',
      title: 'Tanzania Beauty',
      category: 'nature',
      type: 'image',
      description: 'Scenic beauty of Tanzania'
    },
    {
      filename: 'TIME7447.JPG',
      title: 'Scenic Landscape',
      category: 'nature',
      type: 'image',
      description: 'Beautiful landscape photography'
    },
    {
      filename: 'IMG_4391.jpg',
      title: 'Aerial Photography',
      category: 'nature',
      type: 'image',
      description: 'Professional aerial photography'
    },
    {
      filename: 'seregeti..heic',
      title: 'Serengeti Wildlife',
      category: 'nature',
      type: 'image',
      description: 'Wildlife photography in Serengeti'
    },

    // Construction & Development
    {
      filename: 'construction.mp4',
      title: 'Construction Progress',
      category: 'construction',
      type: 'video',
      description: 'Aerial view of construction development'
    },
    {
      filename: 'Over a year of construction .mp4',
      title: 'Year-Long Construction',
      category: 'construction',
      type: 'video',
      description: 'Time-lapse of construction progress'
    },
    {
      filename: 'Our 2 Bedroom Villa at Blu Pearl is coming along as the foundation will be completed soon..mp4',
      title: 'Blu Pearl Villa',
      category: 'construction',
      type: 'video',
      description: '2 bedroom villa construction at Blu Pearl'
    },
    {
      filename: 'MUONEKANO WA JUU WA MJI WA SERIKALI MTUMBA DODOMA.mp4',
      title: 'Dodoma Government City',
      category: 'construction',
      type: 'video',
      description: 'Aerial view of government city development in Dodoma'
    },

    // Real Estate & Properties
    {
      filename: 'muthusovereignsuites.mp4',
      title: 'Muthu Sovereign Suites',
      category: 'real-estate',
      type: 'video',
      description: 'Luxury hotel and suites aerial tour'
    },
    {
      filename: 'masaki .mov',
      title: 'Masaki Properties',
      category: 'real-estate',
      type: 'video',
      description: 'Premium properties in Masaki area'
    },
    {
      filename: 'views.mp4',
      title: 'Property Views',
      category: 'real-estate',
      type: 'video',
      description: 'Stunning property and landscape views'
    },
    {
      filename: 'website .mp4',
      title: 'Website Showcase Properties',
      category: 'real-estate',
      type: 'video',
      description: 'Property showcase for website presentation'
    },

    // Agriculture & Rural
    {
      filename: 'Rice farms view.jpg',
      title: 'Rice Farms',
      category: 'agriculture',
      type: 'image',
      description: 'Aerial view of rice farming fields'
    },

    // Landmarks & Architecture
    {
      filename: 'The Torch Tower in Arusha, Tanzania, is a symbolic structure commemorating the ideals of freedom.jpg',
      title: 'Torch Tower Arusha',
      category: 'landmarks',
      type: 'image',
      description: 'Iconic Torch Tower symbolizing freedom'
    },

    // Professional Showcase
    {
      filename: 'kims#dronetanzania.webp',
      title: 'Drone Tanzania Portfolio',
      category: 'showcase',
      type: 'image',
      description: 'Professional drone photography showcase'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Work', count: mediaItems.length },
    { id: 'weddings', name: 'Weddings', count: mediaItems.filter(item => item.category === 'weddings').length },
    { id: 'nature', name: 'Nature & Wildlife', count: mediaItems.filter(item => item.category === 'nature').length },
    { id: 'travel', name: 'Travel & Tourism', count: mediaItems.filter(item => item.category === 'travel').length },
    { id: 'real-estate', name: 'Real Estate', count: mediaItems.filter(item => item.category === 'real-estate').length },
    { id: 'construction', name: 'Construction', count: mediaItems.filter(item => item.category === 'construction').length },
    { id: 'agriculture', name: 'Agriculture', count: mediaItems.filter(item => item.category === 'agriculture').length },
    { id: 'landmarks', name: 'Landmarks', count: mediaItems.filter(item => item.category === 'landmarks').length },
    { id: 'showcase', name: 'Portfolio', count: mediaItems.filter(item => item.category === 'showcase').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  // Simple path construction without URL encoding for local files
  const getMediaPath = (filename: string) => {
    // Use simple path construction - let the browser handle encoding
    return `/Images and videos/${filename}`;
  };

  const getAlternatePath = (filename: string) => {
    // Fallback to main public folder
    return `/${filename}`;
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
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const mediaPath = getMediaPath(item.filename);
            
            return (
              <div
                key={index}
                className="group bg-neutral-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] bg-black relative overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={mediaPath}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onLoad={() => console.log('✅ Image loaded:', item.filename)}
                      onError={(e) => {
                        console.error('❌ Image failed:', item.filename);
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x600/1f2937/10b981?text=Image+Loading...';
                        target.alt = 'Image loading...';
                      }}
                    />
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      muted
                      playsInline
                      preload="auto"
                      crossOrigin="anonymous"
                      onLoadedData={() => {
                        console.log('✅ Video loaded successfully:', item.filename);
                        console.log('📍 Video path:', mediaPath);
                        
                        // Special logging for the International Love Story video
                        if (item.filename.includes('The love ❤️🇨🇲')) {
                          console.log('🎥 INTERNATIONAL LOVE STORY VIDEO LOADED!');
                          console.log('🔗 Direct test link:', mediaPath);
                        }
                      }}
                      onError={(e) => {
                        console.error('❌ Video failed to load:', item.filename);
                        console.error('📍 Attempted path:', mediaPath);
                        console.error('🔍 Error details:', e);
                        
                        // Special error handling for the International Love Story video
                        if (item.filename.includes('The love ❤️🇨🇲')) {
                          console.error('💔 INTERNATIONAL LOVE STORY VIDEO FAILED!');
                          console.error('🔗 Failed path:', mediaPath);
                          console.error('🔗 Alternate path:', `/${item.filename}`);
                          console.error('📝 Raw filename:', item.filename);
                        }
                      }}
                      onLoadStart={() => {
                        console.log('🔄 Video loading started:', item.filename);
                        
                        // Special start logging for the International Love Story video
                        if (item.filename.includes('The love ❤️🇨🇲')) {
                          console.log('💕 STARTING TO LOAD INTERNATIONAL LOVE STORY');
                          console.log('🎯 Target path:', mediaPath);
                        }
                      }}
                    >
                      <source src={mediaPath} type="video/mp4" />
                      Your browser does not support the video tag.
                      {/* Special debug button for International Love Story video */}
                      {item.filename.includes('The love ❤️🇨🇲') && (
                        <button
                          onClick={() => {
                            console.log('🔍 DEBUGGING INTERNATIONAL LOVE STORY:');
                            console.log('📁 Raw filename:', item.filename);
                            console.log('🔗 Primary path:', mediaPath);
                            console.log('🔗 Alternate path:', getAlternatePath(item.filename));
                            console.log('🌐 Testing direct link...');
                            window.open(mediaPath, '_blank');
                          }}
                          className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded hover:bg-red-500/30 transition-colors"
                        >
                          🔍 Debug
                        </button>
                      )}
                    </video>
                  )}
                  
                  {/* Overlay for images only */}
                  {item.type === 'image' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Media type badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      item.type === 'video' 
                        ? 'bg-red-500/90 text-white' 
                        : 'bg-blue-500/90 text-white'
                    }`}>
                      {item.type === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-full uppercase">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Play button overlay for videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-emerald-500/20 rounded-full p-4 backdrop-blur-sm">
                        <Play className="w-8 h-8 text-emerald-400" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="capitalize">{item.category.replace('-', ' ')}</span>
                      <span>•</span>
                      <span className="capitalize">{item.type}</span>
                    </div>
                    
                    <a
                      href={mediaPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Capture Your Story?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let us bring your vision to life with professional drone photography and videography services across Kenya and Tanzania.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;