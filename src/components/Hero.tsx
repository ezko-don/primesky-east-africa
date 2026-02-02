import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-drone-nairobi.jpg';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Aerial view of Nairobi skyline during golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Overline */}
          <div className="text-overline text-accent mb-8 animate-fade-in">
            Licensed Remote Pilot • XK-RPI-0663A
          </div>
          
          {/* Main Heading */}
          <h1 className="text-hero text-white mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AERIAL CINEMATOGRAPHY
            <br />
            <span className="text-accent">REDEFINED</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Professional drone services across Kenya. From real estate showcases to wedding cinematography, 
            we capture perspectives that inspire.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-light text-accent-foreground font-medium px-8 py-4 hover-lift"
            >
              View Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-medium px-8 py-4 hover-lift"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Reel
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-3xl font-light text-accent mb-2">500+</div>
              <div className="text-sm text-white/80 text-overline">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-accent mb-2">5+</div>
              <div className="text-sm text-white/80 text-overline">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-accent mb-2">24/7</div>
              <div className="text-sm text-white/80 text-overline">Support Available</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;