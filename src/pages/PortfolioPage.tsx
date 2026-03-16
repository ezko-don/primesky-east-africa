import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Portfolio3D from '@/components/Portfolio3D';

const PortfolioPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black"
    >
      {/* Back Button */}
      <div className="fixed top-12 left-12 z-[60]">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/')}
          data-cursor="Home"
          className="flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-[0.4em] text-white/30 group-hover:text-white uppercase transition-all">
            Return
          </span>
        </motion.button>
      </div>

      <Portfolio3D />
    </motion.div>
  );
};

export default PortfolioPage;
