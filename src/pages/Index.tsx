import React from 'react';
import { motion } from 'framer-motion';
import NavigationMinimal from '@/components/NavigationMinimal';
import Hero3D from '@/components/Hero3D';
import Services3D from '@/components/Services3D';
import Portfolio3D from '@/components/Portfolio3D';
import CinematicShowreel from '@/components/CinematicShowreel';
import ProcessTerminal from '@/components/ProcessTerminal';
import TechArsenal from '@/components/TechArsenal';
import ClientMarquee from '@/components/ClientMarquee';
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
      className="min-h-screen bg-black"
    >
      <NavigationMinimal />
      <Hero3D />
      <ClientMarquee />
      <Services3D />
      <Portfolio3D />
      <CinematicShowreel />
      <ProcessTerminal />
      <TechArsenal />
      <AboutMinimal />
      <ContactMinimal />
      <FooterMinimal />
      <FloatingWhatsApp />
    </motion.div>
  );
};

export default Index;
