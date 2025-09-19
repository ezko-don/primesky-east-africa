import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-muted z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-light tracking-wide text-primary">
              PRIMESKY
              <span className="text-accent font-medium ml-2">EAST AFRICA</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-foreground"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+254 741 464497</span>
            </div>
            <Button variant="default" size="sm" className="bg-accent hover:bg-accent-light text-accent-foreground">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-muted mt-4">
            <div className="flex flex-col space-y-4 pt-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link text-foreground text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col items-center space-y-3 pt-4 border-t border-muted">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+254 741 464497</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>info@primeskyea.com</span>
                </div>
                <Button variant="default" className="bg-accent hover:bg-accent-light text-accent-foreground w-full">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;