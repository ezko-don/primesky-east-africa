import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  Twitter,
  Shield,
  Award,
  Clock
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Real Estate Photography', href: '#services' },
    { name: 'Wedding Cinematography', href: '#services' },
    { name: 'Construction Documentation', href: '#services' },
    { name: 'Aerial Mapping', href: '#services' },
    { name: 'Commercial Photography', href: '#services' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Safety Guidelines', href: '#' },
    { name: 'License Information', href: '#' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-2">
                PRIMESKY
                <span className="text-accent font-medium ml-2">EAST AFRICA</span>
              </h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Kenya's premier licensed drone services provider, delivering professional 
                aerial photography and videography with unmatched quality and safety standards.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm">Licensed Pilot XK-RPI-0663A</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-sm">Fully Insured Operations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium mb-6 text-accent">Services</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-6 text-accent">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-6 text-accent">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">+254 741 464497</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">info@primeskyea.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <div className="text-sm">
                  <div>Nairobi, Kenya</div>
                  <div className="text-primary-foreground/60">Serving all of East Africa</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-medium mb-4 text-accent">Follow Us</h5>
              <div className="flex space-x-3">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/60">
              &copy; {new Date().getFullYear()} PrimeSky East Africa. All rights reserved.
            </div>
            
            <div className="text-sm text-primary-foreground/60">
              Remote Pilot License: XK-RPI-0663A | Insured & KCAA Compliant
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;