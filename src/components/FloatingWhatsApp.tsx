import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show the button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '254741464497';
    const message = encodeURIComponent(
      'Hello! I\'m interested in your drone services. Could you please provide more information?'
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Track the WhatsApp click
    trackWhatsAppClick('floating-button', {
      phoneNumber,
      message: 'Hello! I\'m interested in your drone services. Could you please provide more information?',
      expanded: isExpanded
    });
    
    window.open(whatsappUrl, '_blank');
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
    
    // Track expansion/collapse
    trackWhatsAppClick('floating-button-expand', {
      action: isExpanded ? 'collapse' : 'expand'
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <div className="relative">
          {/* Expanded Message Box */}
          {isExpanded && (
            <div className="absolute bottom-12 md:bottom-16 right-0 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-300 mx-4 sm:mx-0">
              {/* Header */}
              <div className="bg-emerald-500 text-white p-3 md:p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Primesky East Africa</h3>
                    <p className="text-xs text-emerald-100">Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Message Content */}
              <div className="p-3 md:p-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-800">
                    👋 Hello! Need professional drone services?
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    We're here to help with aerial photography, videography, and mapping services across Kenya & Tanzania.
                  </p>
                </div>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Chat</span>
                </button>
              </div>
            </div>
          )}

          {/* Main WhatsApp Button */}
          <button
            onClick={handleExpandClick}
            className="group relative bg-emerald-500 hover:bg-emerald-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            {/* Pulsing Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse opacity-30"></div>
            
            {/* WhatsApp Icon */}
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
            
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full animate-bounce"></div>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in-from-bottom-2 {
          from {
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-bottom-2 {
          animation-name: slide-in-from-bottom-2;
        }
        
        @media (max-width: 640px) {
          .fixed {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
