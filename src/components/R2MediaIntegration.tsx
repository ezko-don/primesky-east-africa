import React from 'react';
import { Cloud, Upload, Shield, Zap, DollarSign, Globe } from 'lucide-react';

const R2MediaIntegration = () => {
  const features = [
    {
      icon: <Cloud className="h-8 w-8 text-blue-500" />,
      title: 'Cloudflare R2 Storage',
      description: 'Enterprise-grade object storage for all your drone footage and photography'
    },
    {
      icon: <Upload className="h-8 w-8 text-green-500" />,
      title: 'Easy Upload',
      description: 'Drag-and-drop interface for uploading images and videos up to 500MB'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: 'Secure & Reliable',
      description: 'Your media is stored securely with automatic backups and 99.9% uptime'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Lightning Fast',
      description: 'Global CDN ensures your media loads quickly anywhere in the world'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
      title: 'Cost Effective',
      description: 'Zero egress fees - unlimited bandwidth at no extra cost'
    },
    {
      icon: <Globe className="h-8 w-8 text-cyan-500" />,
      title: 'Global Access',
      description: 'Access your media from anywhere with public URLs or signed links'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powered by Cloudflare R2
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional media storage solution for your drone services business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Store Your Media?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Set up Cloudflare R2 in minutes and start uploading your drone footage, 
              wedding videos, and photography portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admin/media"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Go to Media Admin
              </a>
              <a
                href="/R2_SETUP_GUIDE.md"
                target="_blank"
                className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                View Setup Guide
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">$0</div>
            <div className="text-gray-600 dark:text-gray-400">Egress Fees</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600 dark:text-gray-400">Uptime SLA</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500MB</div>
            <div className="text-gray-600 dark:text-gray-400">Max Video Size</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default R2MediaIntegration;
