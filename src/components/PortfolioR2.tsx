import React, { useState, useEffect } from 'react';
import { Play, Filter, Video, Image, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { listFilesInCategory, getSignedUrlForFile } from '@/services/r2StorageService';
import { R2_CONFIG } from '@/config/r2';

interface R2MediaItem {
  key: string;
  url: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  size: number;
  lastModified: Date;
}

const PortfolioR2 = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mediaItems, setMediaItems] = useState<R2MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  // Fetch media from R2
  useEffect(() => {
    const fetchMedia = async () => {
      console.log('🔄 PortfolioR2: Starting to fetch media from R2...');
      setLoading(true);
      setError(null);
      
      try {
        const allMedia: R2MediaItem[] = [];
        const counts: Record<string, number> = {};

        // Fetch media from all categories
        const categories = Object.keys(R2_CONFIG.FOLDERS);
        console.log('📁 Categories to fetch:', categories);
        
        for (const category of categories) {
          try {
            console.log(`📂 Fetching files from category: ${category}`);
            const files = await listFilesInCategory(category);
            console.log(`✅ Found ${files.length} files in ${category}:`, files);
            
            const mediaWithUrls = await Promise.all(
              files.map(async (file) => {
                // Use public URL if available, otherwise generate signed URL
                const url = R2_CONFIG.PUBLIC_URL 
                  ? `${R2_CONFIG.PUBLIC_URL}/${file.key}`
                  : await getSignedUrlForFile(file.key);

                console.log(`🔗 Generated URL for ${file.key}: ${url}`);

                // Determine file type from extension
                const ext = file.key.split('.').pop()?.toLowerCase() || '';
                const type: 'image' | 'video' = ['mp4', 'mov', 'avi', 'webm'].includes(ext) ? 'video' : 'image';

                // Extract title from filename (remove timestamp and extension)
                const filename = file.key.split('/').pop() || '';
                const title = filename
                  .replace(/^\d+-/, '') // Remove timestamp prefix
                  .replace(/\.[^/.]+$/, '') // Remove extension
                  .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
                  .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

                return {
                  key: file.key,
                  url,
                  title,
                  category,
                  type,
                  size: file.size,
                  lastModified: file.lastModified
                };
              })
            );

            allMedia.push(...mediaWithUrls);
            counts[category] = mediaWithUrls.length;
            console.log(`✅ Processed ${mediaWithUrls.length} files from ${category}`);
          } catch (err) {
            console.error(`❌ Error fetching ${category}:`, err);
          }
        }

        console.log('📊 Total media items loaded:', allMedia.length);
        console.log('📊 Category counts:', counts);
        setMediaItems(allMedia);
        setCategoryCounts(counts);
      } catch (err) {
        console.error('❌ Error fetching media:', err);
        setError(`Failed to load media from R2: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
        console.log('✅ PortfolioR2: Finished loading media');
      }
    };

    fetchMedia();
  }, []);

  const categories = [
    { id: 'all', name: 'All Work', count: mediaItems.length },
    { id: 'weddings', name: 'Weddings', count: categoryCounts['weddings'] || 0 },
    { id: 'nature', name: 'Nature & Wildlife', count: categoryCounts['nature'] || 0 },
    { id: 'travel', name: 'Travel & Tourism', count: categoryCounts['travel'] || 0 },
    { id: 'real-estate', name: 'Real Estate', count: categoryCounts['real-estate'] || 0 },
    { id: 'construction', name: 'Construction', count: categoryCounts['construction'] || 0 },
    { id: 'agriculture', name: 'Agriculture', count: categoryCounts['agriculture'] || 0 },
    { id: 'urban', name: 'Urban', count: categoryCounts['urban'] || 0 },
    { id: 'events', name: 'Events', count: categoryCounts['events'] || 0 }
  ].filter(cat => cat.id === 'all' || cat.count > 0); // Only show categories with media

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <section id="portfolio" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
            <p className="text-gray-400">Loading portfolio from R2...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (mediaItems.length === 0) {
    return (
      <section id="portfolio" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
              Our Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Capturing Kenya & Tanzania
              <span className="block text-emerald-400">From Above</span>
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-gray-400 mb-4">No media found in R2 storage.</p>
            <a 
              href="/media-admin"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
            >
              Upload Media
            </a>
          </div>
        </div>
      </section>
    );
  }

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
          {filteredItems.map((item, index) => (
            <div
              key={item.key}
              className="group bg-neutral-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[4/3] bg-black relative overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={item.url} type="video/mp4" />
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
                <p className="text-gray-400 text-xs mb-4">
                  Uploaded: {item.lastModified.toLocaleDateString()}
                </p>
                
                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="capitalize">{item.category.replace('-', ' ')}</span>
                    <span>•</span>
                    <span className="capitalize">{item.type}</span>
                  </div>
                  
                  <a
                    href={item.url}
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
          ))}
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

export default PortfolioR2;
