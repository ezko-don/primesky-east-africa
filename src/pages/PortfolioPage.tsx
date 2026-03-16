import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Portfolio3D from '@/components/Portfolio3D';

const PortfolioPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30"
    >
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-neutral-200 hover:border-emerald-400"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600 group-hover:text-emerald-500 transition-colors" />
          <span className="text-sm font-light tracking-wider text-neutral-700 group-hover:text-emerald-600">
            Back to Home
          </span>
        </motion.button>
      </div>

      {/* Portfolio Content */}
      <div className="pt-24">
        <Portfolio3D />
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
