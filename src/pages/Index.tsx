import React from 'react';
import { motion } from 'framer-motion';
import NavigationMinimal from '@/components/NavigationMinimal';
import Hero3D from '@/components/Hero3D';
import Services3D from '@/components/Services3D';
import AboutMinimal from '@/components/AboutMinimal';
import ContactMinimal from '@/components/ContactMinimal';
import FooterMinimal from '@/components/FooterMinimal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <NavigationMinimal />
      <Hero3D />
      <Services3D />
      <AboutMinimal />
      <ContactMinimal />
      <FooterMinimal />
      <FloatingWhatsApp />
    </motion.div>
  );
};

export default Index;
