import { Play } from 'lucide-react';
import realEstateImage from '@/assets/real-estate-drone.jpg';
import weddingImage from '@/assets/wedding-drone.jpg';
import constructionImage from '@/assets/construction-drone.jpg';

const VideoShowcase = () => {
  const videos = [
    {
      title: "REAL ESTATE - LUXURY VILLA",
      image: realEstateImage,
      description: "Aerial showcase of premium properties"
    },
    {
      title: "WEDDING - GARDEN CEREMONY", 
      image: weddingImage,
      description: "Cinematic wedding documentation"
    },
    {
      title: "CONSTRUCTION - PROGRESS DOCUMENTATION",
      image: constructionImage,
      description: "Professional construction monitoring"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="space-y-20">
          {videos.map((video, index) => (
            <div key={index} className="group">
              {/* Video Container */}
              <div className="relative w-full h-[70vh] overflow-hidden bg-black">
                <img 
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </button>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute top-8 left-8">
                  <div className="text-overline text-white/90 mb-2">
                    {video.title}
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground font-light">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;