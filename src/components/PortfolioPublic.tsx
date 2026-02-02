import React, { useState } from 'react';
import { Play, Filter, Video, Image, ExternalLink } from 'lucide-react';
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
      filename: 'Nature/views.mp4',
      title: 'Scenic Views',
      category: 'nature',
      type: 'video',
      description: 'Stunning landscape views'
    },
    {
      filename: 'Nature/website .mp4',
      title: 'Nature Showcase',
      category: 'nature',
      type: 'video',
      description: 'Nature and landscape showcase'
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
      filename: 'Real estate/masai mara.mp4',
      title: 'Masai Mara Property',
      category: 'real-estate',
      type: 'video',
      description: 'Property in Masai Mara area'
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
    {
      filename: 'Real estate/trip to Zanzibar.🇹🇿🏝️🏖️.jpg',
      title: 'Zanzibar Island Beauty',
      category: 'real-estate',
      type: 'image',
      description: 'Tropical paradise from the sky'
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
            const mediaUrl = getMediaUrl(item.filename);
            
            return (
              <div
                key={index}
                className="group bg-neutral-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] bg-black relative overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onLoad={() => console.log('✅ Image loaded:', item.title, mediaUrl)}
                      onError={(e) => {
                        console.error('❌ Failed to load image:', item.title);
                        console.error('URL:', mediaUrl);
                        console.error('Original filename:', item.filename);
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
                      onLoadedMetadata={() => console.log('✅ Video loaded:', item.title, mediaUrl)}
                      onError={(e) => {
                        console.error('❌ Failed to load video:', item.title);
                        console.error('URL:', mediaUrl);
                        console.error('Original filename:', item.filename);
                        const videoElement = e.target as HTMLVideoElement;
                        console.error('Video error code:', videoElement.error?.code);
                        console.error('Video error message:', videoElement.error?.message);
                      }}
                    >
                      <source src={mediaUrl} type="video/mp4" />
                      <source src={mediaUrl} type="video/quicktime" />
                      Your browser does not support the video tag.
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
                      href={mediaUrl}
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
