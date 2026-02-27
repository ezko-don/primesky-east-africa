import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const FooterMinimal = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <img 
                src="/primesky-logo.png" 
                alt="PrimeSky" 
                className="h-8 w-8"
              />
              <span className="text-lg font-light tracking-wider text-neutral-900">
                PRIMESKY
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              © {currentYear} PrimeSky East Africa. All rights reserved.
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              License: XK-RPI-0663A
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/primeskyeastafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/primeskyeastafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/primeskyea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:primeskyeastafrica@yahoo.com"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
